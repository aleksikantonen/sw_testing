import type { JSX } from 'solid-js/jsx-runtime'

type NavItemProps = {
  label: string | JSX.Element
  href?: string
  onClick?: () => void
}

const NavItem = (props: NavItemProps) => {
  if (props.href) {
    return (
      <a class="px-4 font-semibold hover:underline" href={props.href} onClick={props.onClick}>
        {props.label}
      </a>
    )
  }

  if (props.onClick) {
    return (
      <button class="px-4 font-semibold hover:underline" onClick={props.onClick}>
        {props.label}
      </button>
    )
  }

  return <span class="px-4 font-semibold">{props.label}</span>
}

export default NavItem
