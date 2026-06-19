import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-frontmatter'],
  },
})

const nextConfig: NextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'mdx'],
}

export default withMDX(nextConfig)
