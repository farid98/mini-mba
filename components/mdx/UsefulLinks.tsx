interface LinkItem {
  title: string
  href: string
  description?: string
}

export default function UsefulLinks({ links }: { links: LinkItem[] }) {
  return (
    <div className="mt-10 pt-6 border-t border-line">
      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-fg-subtle mb-4">
        Further Reading
      </p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-medium text-fg hover:underline"
            >
              {link.title} ↗
            </a>
            {link.description && (
              <p className="text-[13px] text-fg-muted mt-0.5 leading-snug">{link.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
