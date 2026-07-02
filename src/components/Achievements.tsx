const achievements = [
  ['200+', 'Problems solved on LeetCode'],
  ['250+', 'Problems solved on GeeksforGeeks'],
  ['Completed', "Striver's DSA Sheet"],
  ['Top Performer', 'College coding challenges']
];
export function Achievements() {
  return <section id='achievements' className='section'><div className='section__heading'><span>Proof</span><h2>Achievements</h2></div><div className='achievement-grid'>{achievements.map(([value, label]) => <div className='glass achievement-card' key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>;
}