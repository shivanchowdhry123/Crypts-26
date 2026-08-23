import { Document, NodeIO } from '@gltf-transform/core';
import { KHRONOS_EXTENSIONS } from '@gltf-transform/extensions';

async function processGLB() {
    const io = new NodeIO().registerExtensions(KHRONOS_EXTENSIONS);
    
    console.log("Reading...");
    // Read from the ORIGINAL uncompressed file so we don't double-compress or lose data
    const document = await io.read('c:/Users/EESHAAN/CRYPTS/glb_1568702f-1ba6-426b-a997-672a58870bba/modelToUsed.glb');

    console.log("Modifying materials...");
    
    // Hex to RGB
    const hex = '#CA02A1'.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    const toLinear = (c) => c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
    const colorLinear = [toLinear(r), toLinear(g), toLinear(b), 1.0];

    // Create a new master material
    const newMaterial = document.createMaterial('BrandMaterial')
        .setBaseColorFactor(colorLinear)
        .setMetallicFactor(1.0)
        .setRoughnessFactor(0.15); // Glossy

    const meshes = document.getRoot().listMeshes();
    for (const mesh of meshes) {
        for (const prim of mesh.listPrimitives()) {
            // Remove vertex colors which override the material color
            const colorAttr = prim.getAttribute('COLOR_0');
            if (colorAttr) {
                prim.setAttribute('COLOR_0', null);
            }
            
            // Assign our new material to EVERY primitive
            prim.setMaterial(newMaterial);
        }
    }

    // Clean up unused extensions like KHR_materials_unlit
    const unlitExtension = document.getRoot().listExtensions().find(e => e.extensionName === 'KHR_materials_unlit');
    if (unlitExtension) {
        unlitExtension.dispose();
    }

    console.log("Writing...");
    await io.write('c:/Users/EESHAAN/CRYPTS/public/new_logo_colored.glb', document);
    console.log("Done!");
}

processGLB().catch(console.error);
