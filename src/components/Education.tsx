const education = [
  ['B.E. Electronics & Telecommunication Engineering', "PDEA's College of Engineering, Pune", 'Savitribai Phule Pune University', '2023 - 2027', 'Currently Third Year'],
  ['Class XII', 'BSEB', '2023', '76%', 'Science stream'],
  ['Class X', 'CBSE', '2021', '61%', 'Foundation years']
];
export function Education() {
  return <section id='education' className='section'><div className='section__heading'><span>Learning</span><h2>Education</h2></div><div className='grid cards'>{education.map(([title, institute, board, year, meta]) => <article className='glass card' key={title}><div className='card__kicker'>{year}</div><h3>{title}</h3><p>{institute}</p><p>{board}</p><p>{meta}</p></article>)}</div></section>;
}