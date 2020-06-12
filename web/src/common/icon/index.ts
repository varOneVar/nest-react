const req: __WebpackModuleApi.RequireContext = require.context(
  './svg',
  false,
  /\.svg$/
)
const reqColor: __WebpackModuleApi.RequireContext = require.context(
  './svg-color',
  false,
  /\.svg$/
)
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().map(requireContext)

requireAll(req)
requireAll(reqColor)

export {}
