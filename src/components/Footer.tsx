export function Footer({ profile }: { profile: { name: string } }) {
  return <footer className='footer'><div>{profile.name} · Made with React + Three.js</div><a href='#home'>Back To Top</a></footer>;
}