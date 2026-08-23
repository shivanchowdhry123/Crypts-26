import { Document, NodeIO } from '@gltf-transform/core';
import { KHRONOS_EXTENSIONS } from '@gltf-transform/extensions';

async function processGLB() {
    const io = new NodeIO().registerExtensions(KHRONOS_EXTENSIONS);
    
    console.log("Reading...");
    const document = await io.read('c:/Users/EESHAAN/CRYPTS/public/new_logo.glb');

    console.log("Modifying materials...");
    const materials = document.getRoot().listMaterials();
    for (const material of materials) {
        // Hex to RGB
        const hex = '#CA02A1'.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;

        // sRGB to Linear
        const toLinear = (c) => c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;

        material.setBaseColorFactor([toLinear(r), toLinear(g), toLinear(b), 1.0]);
        material.setMetallicFactor(1.0);
        material.setRoughnessFactor(0.15); // Very Glossy
        
        // Remove any textures that might override the base color/metallic/roughness
        material.setBaseColorTexture(null);
        material.setMetallicRoughnessTexture(null);
    }

    console.log("Writing...");
    await io.write('c:/Users/EESHAAN/CRYPTS/public/new_logo_colored.glb', document);
    console.log("Done!");
}

processGLB().catch(console.error);
