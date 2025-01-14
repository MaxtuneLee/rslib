import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { buildAndGetResults } from 'test-helper';
import { describe, expect, test } from 'vitest';

describe('dts when bundle: false', () => {
  test('basic', async () => {
    const fixturePath = join(__dirname, 'bundle-false', 'basic');
    const { files, contents } = await buildAndGetResults({
      fixturePath,
      type: 'dts',
    });

    expect(files.esm).toMatchInlineSnapshot(`
      [
        "<ROOT>/tests/integration/dts/bundle-false/basic/dist/esm/index.d.ts",
        "<ROOT>/tests/integration/dts/bundle-false/basic/dist/esm/sum.d.ts",
        "<ROOT>/tests/integration/dts/bundle-false/basic/dist/esm/utils/numbers.d.ts",
        "<ROOT>/tests/integration/dts/bundle-false/basic/dist/esm/utils/strings.d.ts",
      ]
    `);

    expect(files.cjs).toMatchInlineSnapshot(`
      [
        "<ROOT>/tests/integration/dts/bundle-false/basic/dist/cjs/index.d.ts",
        "<ROOT>/tests/integration/dts/bundle-false/basic/dist/cjs/sum.d.ts",
        "<ROOT>/tests/integration/dts/bundle-false/basic/dist/cjs/utils/numbers.d.ts",
        "<ROOT>/tests/integration/dts/bundle-false/basic/dist/cjs/utils/strings.d.ts",
      ]
    `);

    expect(contents.esm).toMatchSnapshot();
  });

  test('dts false', async () => {
    const fixturePath = join(__dirname, 'bundle-false', 'false');
    const { files } = await buildAndGetResults({ fixturePath, type: 'dts' });

    expect(files.esm).toMatchInlineSnapshot('undefined');
  });

  test('dts true', async () => {
    const fixturePath = join(__dirname, 'bundle-false', 'true');
    const { files } = await buildAndGetResults({ fixturePath, type: 'dts' });

    expect(files.esm).toMatchInlineSnapshot(`
      [
        "<ROOT>/tests/integration/dts/bundle-false/true/dist/esm/index.d.ts",
        "<ROOT>/tests/integration/dts/bundle-false/true/dist/esm/sum.d.ts",
        "<ROOT>/tests/integration/dts/bundle-false/true/dist/esm/utils/numbers.d.ts",
        "<ROOT>/tests/integration/dts/bundle-false/true/dist/esm/utils/strings.d.ts",
      ]
    `);
  });

  test('distPath', async () => {
    const fixturePath = join(__dirname, 'bundle-false', 'dist-path');
    const { files } = await buildAndGetResults({ fixturePath, type: 'dts' });

    expect(files.esm).toMatchInlineSnapshot(`
      [
        "<ROOT>/tests/integration/dts/bundle-false/dist-path/dist/custom/index.d.ts",
        "<ROOT>/tests/integration/dts/bundle-false/dist-path/dist/custom/sum.d.ts",
        "<ROOT>/tests/integration/dts/bundle-false/dist-path/dist/custom/utils/numbers.d.ts",
        "<ROOT>/tests/integration/dts/bundle-false/dist-path/dist/custom/utils/strings.d.ts",
      ]
    `);
  });

  test('abortOnError: false', async () => {
    const fixturePath = join(__dirname, 'bundle-false', 'abort-on-error');
    const { isSuccess } = await buildAndGetResults({
      fixturePath,
      type: 'dts',
    });

    expect(isSuccess).toBe(true);
  });

  test('autoExtension: true', async () => {
    const fixturePath = join(__dirname, 'bundle-false', 'auto-extension');
    const { files } = await buildAndGetResults({ fixturePath, type: 'dts' });

    expect(files.cjs).toMatchInlineSnapshot(`
      [
        "<ROOT>/tests/integration/dts/bundle-false/auto-extension/dist/cjs/index.d.cts",
        "<ROOT>/tests/integration/dts/bundle-false/auto-extension/dist/cjs/sum.d.cts",
        "<ROOT>/tests/integration/dts/bundle-false/auto-extension/dist/cjs/utils/numbers.d.cts",
        "<ROOT>/tests/integration/dts/bundle-false/auto-extension/dist/cjs/utils/strings.d.cts",
      ]
    `);
  });
});

describe('dts when bundle: true', () => {
  test('basic', async () => {
    const fixturePath = join(__dirname, 'bundle', 'basic');
    const { files, entries } = await buildAndGetResults({
      fixturePath,
      type: 'dts',
    });

    expect(files.esm).toMatchInlineSnapshot(
      `
      [
        "<ROOT>/tests/integration/dts/bundle/basic/dist/esm/index.d.ts",
      ]
    `,
    );

    expect(files.cjs).toMatchInlineSnapshot(
      `
      [
        "<ROOT>/tests/integration/dts/bundle/basic/dist/cjs/index.d.ts",
      ]
    `,
    );

    expect(entries).toMatchSnapshot();
  });

  test('dts false', async () => {
    const fixturePath = join(__dirname, 'bundle', 'false');
    const { files } = await buildAndGetResults({
      fixturePath,
      type: 'dts',
    });

    expect(files.esm).toMatchInlineSnapshot('undefined');
  });

  test('dts true', async () => {
    const fixturePath = join(__dirname, 'bundle', 'true');
    const { files } = await buildAndGetResults({
      fixturePath,
      type: 'dts',
    });

    expect(files.esm).toMatchInlineSnapshot(
      `
      [
        "<ROOT>/tests/integration/dts/bundle/true/dist/esm/index.d.ts",
        "<ROOT>/tests/integration/dts/bundle/true/dist/esm/sum.d.ts",
        "<ROOT>/tests/integration/dts/bundle/true/dist/esm/utils/numbers.d.ts",
        "<ROOT>/tests/integration/dts/bundle/true/dist/esm/utils/strings.d.ts",
      ]
    `,
    );
  });

  test('distPath', async () => {
    const fixturePath = join(__dirname, 'bundle', 'dist-path');
    const { files } = await buildAndGetResults({
      fixturePath,
      type: 'dts',
    });

    expect(files.esm).toMatchInlineSnapshot(
      `
      [
        "<ROOT>/tests/integration/dts/bundle/dist-path/dist/custom/index.d.ts",
      ]
    `,
    );
  });

  test('abortOnError: false', async () => {
    const fixturePath = join(__dirname, 'bundle', 'abort-on-error');
    const { isSuccess } = await buildAndGetResults({
      fixturePath,
      type: 'dts',
    });

    expect(isSuccess).toBe(true);
  });

  test('autoExtension: true', async () => {
    const fixturePath = join(__dirname, 'bundle', 'auto-extension');
    const { files } = await buildAndGetResults({
      fixturePath,
      type: 'dts',
    });

    expect(files.cjs).toMatchInlineSnapshot(
      `
      [
        "<ROOT>/tests/integration/dts/bundle/auto-extension/dist/cjs/index.d.cts",
      ]
    `,
    );
  });

  test('bundleName -- set source.entry', async () => {
    const fixturePath = join(__dirname, 'bundle', 'bundle-name');
    const { files } = await buildAndGetResults({
      fixturePath,
      type: 'dts',
    });

    expect(files.esm).toMatchInlineSnapshot(
      `
      [
        "<ROOT>/tests/integration/dts/bundle/bundle-name/dist/esm/bundleName.d.ts",
      ]
    `,
    );
  });

  test('entry is an absolute path', async () => {
    const fixturePath = join(__dirname, 'bundle', 'absolute-entry');
    const { files } = await buildAndGetResults({
      fixturePath,
      type: 'dts',
    });

    expect(files.esm).toMatchInlineSnapshot(
      `
      [
        "<ROOT>/tests/integration/dts/bundle/absolute-entry/dist/esm/index.d.ts",
      ]
    `,
    );
  });

  test('rootdir calculation should ignore declaration files', async () => {
    const fixturePath = join(__dirname, 'bundle', 'rootdir');
    const { files, entries } = await buildAndGetResults({
      fixturePath,
      type: 'dts',
    });

    expect(files.esm).toMatchInlineSnapshot(`
      [
        "<ROOT>/tests/integration/dts/bundle/rootdir/dist/esm/index.d.ts",
      ]
    `);

    expect(files.cjs).toMatchInlineSnapshot(`
      [
        "<ROOT>/tests/integration/dts/bundle/rootdir/dist/cjs/index.d.ts",
      ]
    `);

    expect(entries).toMatchSnapshot();
  });
});

describe('dts when build: true', () => {
  test('basic', async () => {
    const fixturePath = join(__dirname, 'composite', 'basic');
    const { files } = await buildAndGetResults({
      fixturePath,
      type: 'dts',
    });

    expect(files.esm).toMatchInlineSnapshot(`
      [
        "<ROOT>/tests/integration/dts/composite/basic/dist/esm/index.d.ts",
        "<ROOT>/tests/integration/dts/composite/basic/dist/esm/sum.d.ts",
      ]
    `);

    const compositeDistPath = join(
      fixturePath,
      '../__references__/dist/index.d.ts',
    );
    expect(existsSync(compositeDistPath)).toBeTruthy();
  });

  test('distPath', async () => {
    const fixturePath = join(__dirname, 'composite', 'dist-path');
    const { files } = await buildAndGetResults({
      fixturePath,
      type: 'dts',
    });

    expect(files.esm).toMatchInlineSnapshot(`
      [
        "<ROOT>/tests/integration/dts/composite/dist-path/dist/custom/index.d.ts",
      ]
    `);
  });

  test('process files - auto extension and banner / footer', async () => {
    const fixturePath = join(__dirname, 'composite', 'process-files');
    const { contents } = await buildAndGetResults({
      fixturePath,
      type: 'dts',
    });

    expect(contents.esm).toMatchInlineSnapshot(`
      {
        "<ROOT>/tests/integration/dts/composite/process-files/dist/esm/index.d.mts": "/*! hello banner dts composite*/
      export declare const num1 = 1;

      /*! hello banner dts composite*/
      ",
      }
    `);
  });

  test('abortOnError: false', async () => {
    const fixturePath = join(__dirname, 'composite', 'abort-on-error');
    const { isSuccess } = await buildAndGetResults({
      fixturePath,
      type: 'dts',
    });

    expect(isSuccess).toBe(true);
  });

  test('tsconfig missing some fields', async () => {
    const fixturePath = join(__dirname, 'composite', 'tsconfig');
    try {
      await buildAndGetResults({
        fixturePath,
        type: 'dts',
      });
    } catch (err: any) {
      // not easy to proxy child process stdout
      expect(err.message).toBe('Error occurred in esm DTS generation');
    }
  });
});
