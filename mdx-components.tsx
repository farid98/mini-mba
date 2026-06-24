import type { MDXComponents } from 'mdx/types'
import Callout from '@/components/mdx/Callout'
import Diagram from '@/components/mdx/Diagram'
import Example from '@/components/mdx/Example'
import FiveForces from '@/components/mdx/FiveForces'
import Matrix2x2 from '@/components/mdx/Matrix2x2'
import Takeaways from '@/components/mdx/Takeaways'
import Slide from '@/components/mdx/Slide'
import SlideShow from '@/components/mdx/SlideShow'
import Discussion from '@/components/mdx/Discussion'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Callout,
    Diagram,
    Example,
    FiveForces,
    Matrix2x2,
    Takeaways,
    Slide,
    SlideShow,
    Discussion,
  }
}
