import { FiExternalLink, FiGithub, FiLinkedin } from 'react-icons/fi';
import { SiLeetcode, SiCodeforces, SiGeeksforgeeks } from 'react-icons/si';
const icons: Record<string, JSX.Element> = { github: <FiGithub />, linkedin: <FiLinkedin />, leetcode: <SiLeetcode />, gfg: <SiGeeksforgeeks />, codeforces: <SiCodeforces /> };
export function CodingProfiles({ socials }: { socials: Record<string, { label: string; username: string; url: string }> }) {
  return <section id='coding' className='section'><div className='section__heading'><span>Profiles</span><h2>Coding</h2></div><div className='profiles-grid'>{Object.entries(socials).map(([key, profile]) => <article className='glass profile-card' key={key}><div className='profile-card__icon'>{icons[key]}</div><h3>{profile.label}</h3><p>{profile.username}</p><a href={profile.url}>Visit Profile <FiExternalLink /></a></article>)}</div></section>;
}