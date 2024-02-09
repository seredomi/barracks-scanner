import { defineConfig } from 'vite';
import { tamaguiExtractPlugin, tamaguiPlugin } from '@tamagui/vite-plugin';
import tamaguiConfig from './src/tamagui.config';

// https://vitejs.dev/config
export default defineConfig({
    plugins: [
        tamaguiPlugin({
            config: './src/tamagui.config.ts',
            components: ['tamagui'],
        }),

        // tamaguiExtractPlugin(tamaguiConfig),

    ]
});
