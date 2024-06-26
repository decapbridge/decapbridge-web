import useGlobalData from "/src/hooks/useGlobalData"
import { getDirectusUrl, getGitGatewayUrl } from "/src/utils/constants"
import { Site } from "/src/utils/directus"

const useCmsYamlConfig = (site: Site) => {

  const global = useGlobalData()

  const siteUrl = site.cms_url ? new URL(site.cms_url).origin : null

  return `
# Use DecapBridge auth (required)
backend:
  name: git-gateway
  repo: ${site.repo}
  branch: main
  identity_url: ${getDirectusUrl()}/sites/${site.id}
  gateway_url: ${getGitGatewayUrl()}

  # Quickly see who did what (optional)
  commit_messages:
    create: Create {{collection}} “{{slug}}” - {{author-name}} <{{author-login}}> via DecapBridge
    update: Update {{collection}} “{{slug}}” - {{author-name}} <{{author-login}}> via DecapBridge
    delete: Delete {{collection}} “{{slug}}” - {{author-name}} <{{author-login}}> via DecapBridge
    uploadMedia: Upload “{{path}}” - {{author-name}} <{{author-login}}> via DecapBridge
    deleteMedia: Delete “{{path}}” - {{author-name}} <{{author-login}}> via DecapBridge
    openAuthoring: Message {{message}} - {{author-name}} <{{author-login}}> via DecapBridge

# Better Decap + Bridge logo (optional)
logo_url: ${global.site.site_url}/decapcms-with-bridge.svg

${siteUrl ? (
      `# Add site links in DecapCMS (optional)
site_url: ${siteUrl}`) : ''
    }
`
}


export default useCmsYamlConfig