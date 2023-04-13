// process.env.NODE_ENV的值：开发（development）测试（test）生产（production）
export const BASE_HOST = 'http://httpbin.org/';
export let BASE_METHOD: string;
if (process.env.NODE_ENV === 'development') {
  BASE_METHOD = 'get';
} else if (process.env.NODE_ENV === 'test') {
  BASE_METHOD = 'test';
} else {
  BASE_METHOD = 'post';
}
