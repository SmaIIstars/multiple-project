import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig, Plugin } from 'vite'
// import { base64 } from 'vite-plugin-base64'
import fs from 'fs'
import { viteMockServe } from 'vite-plugin-mock'
import svgr from 'vite-plugin-svgr'

export const base64 = async (): Promise<Plugin> => {
  return {
    name: 'vite-plugin-base64',
    enforce: 'pre' as const,
    load: async (id: string) => {
      
      // 通过切割path后缀判断是否为图片
      const isImageByPathSuffix = (filePath: string): boolean => {
        // 支持的图片后缀
        const imageSuffixes = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg', 'ico', 'tiff', 'tif']
        
        // 切割path获取后缀
        const pathParts = filePath.split('.')
        if (pathParts.length < 2) return false
        
        const suffix = pathParts[pathParts.length - 1].toLowerCase()
        const isImage = imageSuffixes.includes(suffix)
        
        if (isImage) {
          console.log(`检测到图片文件: ${filePath} (后缀: ${suffix})`)
        }
        
        return isImage
      }

      if(isImageByPathSuffix(id)) {
        console.log(id)
      const buffer = fs.readFileSync(id)
      const base64 = buffer.toString('base64')
      const { fileTypeFromBuffer } = await import('file-type')
      const typeResult = await fileTypeFromBuffer(
        new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length),
      )
      const type = typeResult?.mime ?? 'application/octet-stream'
      const src = `data:${type};base64,${base64}`
      return `export default '${src}';`
    }}
}
}

export default defineConfig({
  base: '/react-demo',
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
      },
    }),
    viteMockServe({
      mockPath: './src/mock',
      logger: true,
      prodEnabled: true,
      injectCode: `import { createProdMockServer } from "./src/mockProdServer.js"; setupProdMockServer();`,
    }),
    base64(),
  ],
  resolve: {
    alias: {
      '~@': resolve('../../'),
      '@': resolve(__dirname, 'src'),
      pages: resolve('@/pages'),
      components: resolve('@/components'),
      routes: resolve('@/routes'),
      service: resolve('@/service'),
      utils: resolve('@/utils'),
      store: resolve('@/store'),
    },
  },
  server: {
    proxy: {
      '/blogApi': {
        target: 'http://blog.smallstars.top',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/blogApi/, ''),
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      scopeBehaviour: 'local',
    },
  },
  build: {
    outDir: 'react-demo',
    sourcemap: true,
  },
})
