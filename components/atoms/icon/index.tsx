// ** Icon Imports
import { Icon as IconifyIcon, IconProps } from '@iconify/react'

export const Icon = ({ icon, ...rest }: IconProps) => {
  return <IconifyIcon icon={icon} fontSize='1.5rem' {...rest} />
}
