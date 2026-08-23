import { Document, NodeIO } from '@gltf-transform/core';
import { KHRONOS_EXTENSIONS } from '@gltf-transform/extensions';

async function processGLB() {
    const io = new NodeIO().registerExtensions(KHRONOS_EXTENSIONS);
    
    console.log("Reading...");
    // Read from the original uncompressed file again to avoid accumulating weird transforms
    const document = await io.read('c:/Users/EESHAAN/CRYPTS/glb_1568702f-1ba6-426b-a997-672a58870bba/modelToUsed.glb');

    console.log("Modifying materials for gradient...");
    
    // Hex to Linear RGB
    const hexToLinear = (hex) => {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;
        const toLinear = (c) => c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
        return [toLinear(r), toLinear(g), toLinear(b)];
    };

    const colorStart = hexToLinear('#CA02A1'); // Bottom
    const colorEnd = hexToLinear('#FC19EE');   // Top

    // Find global bounding box for Y across all meshes
    let minY = Infinity;
    let maxY = -Infinity;

    for (const mesh of document.getRoot().listMeshes()) {
        for (const prim of mesh.listPrimitives()) {
            const posAccessor = prim.getAttribute('POSITION');
            if (posAccessor) {
                for (let i = 0; i < posAccessor.getCount(); i++) {
                    const y = posAccessor.getArray()[i * 3 + 1];
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
        }
    }

    const rangeY = maxY - minY;

    // Create a new master material
    // We use pure white base color so vertex colors multiply properly.
    const newMaterial = document.createMaterial('GradientMaterial')
        .setBaseColorFactor([1.0, 1.0, 1.0, 1.0])
        .setMetallicFactor(1.0)
        .setRoughnessFactor(0.01); // Even MORE glossy

    for (const mesh of document.getRoot().listMeshes()) {
        for (const prim of mesh.listPrimitives()) {
            const posAccessor = prim.getAttribute('POSITION');
            if (posAccessor) {
                const count = posAccessor.getCount();
                const colors = new Float32Array(count * 4);
                const posArray = posAccessor.getArray();

                for (let i = 0; i < count; i++) {
                    const y = posArray[i * 3 + 1];
                    let t = rangeY > 0 ? (y - minY) / rangeY : 0.5;
                    // Clamp t just in case
                    t = Math.max(0, Math.min(1, t));

                    colors[i * 4 + 0] = colorStart[0] + (colorEnd[0] - colorStart[0]) * t; // R
                    colors[i * 4 + 1] = colorStart[1] + (colorEnd[1] - colorStart[1]) * t; // G
                    colors[i * 4 + 2] = colorStart[2] + (colorEnd[2] - colorStart[2]) * t; // B
                    colors[i * 4 + 3] = 1.0; // Alpha
                }

                const colorAccessor = document.createAccessor()
                    .setType('VEC4')
                    .setArray(colors)
                    .setBuffer(posAccessor.getBuffer());

                prim.setAttribute('COLOR_0', colorAccessor);
            }
            prim.setMaterial(newMaterial);
        }
    }

    // Clean up unlit extension
    const unlitExtension = document.getRoot().listExtensions().find(e => e.extensionName === 'KHR_materials_unlit');
    if (unlitExtension) {
        unlitExtension.dispose();
    }

    console.log("Writing...");
    await io.write('c:/Users/EESHAAN/CRYPTS/public/new_logo_colored.glb', document);
    console.log("Done!");
}

processGLB().catch(console.error);
