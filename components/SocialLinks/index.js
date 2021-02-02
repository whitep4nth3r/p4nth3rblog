export default function SocialLinks(props) {
  const { socialLinks } = props;
  return (
    <div>
      {socialLinks.map(link => (
        <a href={link.link} 
        aria-label={link.ariaLabel}
        target="_blank"
        rel="noopener nofollow">{link.name}</a> 
    ))}
    </div>
  )

}