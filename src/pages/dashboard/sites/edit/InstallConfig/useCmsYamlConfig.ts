import useGlobalData from "/src/hooks/useGlobalData"
import { getDirectusUrl, getGitGatewayUrl } from "/src/utils/constants"
import { Site } from "/src/utils/directus"

const useCmsYamlConfig = (site: Site) => {

  const global = useGlobalData()

  const siteUrl = site.cms_url ? new URL(site.cms_url).origin : null;

  const optionalBlock = `# See who did what (optional)
  commit_messages:
    create: Create {{collection}} “{{slug}}” - {{author-name}} <{{author-login}}> via DecapBridge
    update: Update {{collection}} “{{slug}}” - {{author-name}} <{{author-login}}> via DecapBridge
    delete: Delete {{collection}} “{{slug}}” - {{author-name}} <{{author-login}}> via DecapBridge
    uploadMedia: Upload “{{path}}” - {{author-name}} <{{author-login}}> via DecapBridge
    deleteMedia: Delete “{{path}}” - {{author-name}} <{{author-login}}> via DecapBridge
    openAuthoring: Message {{message}} - {{author-name}} <{{author-login}}> via DecapBridge`


  const bottomBlock = `# Better Decap + Bridge logo (optional)
logo_url: ${global.site.site_url}/decapcms-with-bridge.svg

${siteUrl ? (
      `# Add site links in Decap CMS (optional)
site_url: ${siteUrl}`) : ''
    }`

  if (site.auth_type === 'classic') {

    return `
# Use DecapBridge classic auth (required)
backend:
  name: git-gateway
  repo: ${site.repo}
  branch: main
  identity_url: ${getDirectusUrl()}/sites/${site.id}
  gateway_url: ${getGitGatewayUrl()}

  ${optionalBlock}

${bottomBlock}`
  }



  return `
# Use DecapBridge PKCE auth (required)
backend:
  name: git-gateway
  repo: ${site.repo}
  branch: main
  auth_type: pkce
  base_url: ${getDirectusUrl()}
  auth_endpoint: /sites/${site.id}/pkce
  auth_token_endpoint: /sites/${site.id}/token
  gateway_url: ${getGitGatewayUrl()}

  ${optionalBlock}

# Enable PKCE fields (optional, recommended)
auth:
  email_claim: email
  first_name_claim: first_name
  last_name_claim: last_name
  avatar_url_claim: avatar_url

${bottomBlock}`
}


export default useCmsYamlConfig