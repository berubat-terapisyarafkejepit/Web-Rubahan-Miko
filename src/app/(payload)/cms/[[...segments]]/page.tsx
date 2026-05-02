import config from '@payload-config'
import { RootPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Props = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export default function PayloadAdminPage(props: Props) {
  return RootPage({
    config: Promise.resolve(config),
    importMap,
    params: props.params,
    searchParams: props.searchParams,
  })
}
