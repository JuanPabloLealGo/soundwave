import IconInterface from "./IconInterface"

export default interface CategoryItemInterface {
  id: string
  name: string
  href: string
  icons: Array<IconInterface>
}