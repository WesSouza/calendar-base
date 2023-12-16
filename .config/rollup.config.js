import typescript from '@rollup/plugin-typescript';
import esbuild from 'rollup-plugin-esbuild';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        dir: './dist',
        format: 'cjs',
        entryFileNames: '[name].cjs',
        exports: 'auto',
        preserveModules: true,
        sourcemap: true,
      },
      {
        dir: './dist',
        exports: 'auto',
        format: 'es',
        preserveModules: true,
        sourcemap: true,
      },
    ],
    external: (id) => !/^[./]/.test(id),
    plugins: [
      esbuild(),
      typescript({
        tsconfig: '.config/tsconfig.build.json',
        declaration: true,
        declarationDir: 'dist',
      }),
    ],
  },
];
