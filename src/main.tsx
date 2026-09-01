import { createRoot } from 'react-dom/client';
import { useEffect, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, Building2, CalendarDays, CheckCircle2, ExternalLink, FilePenLine, Landmark, MapPin, Megaphone, Menu, Mic, Ticket, Users, UsersRound, Vote } from 'lucide-react';
import './styles.css';

const pages = ['home', 'calendar', 'get-involved', 'our-clp'] as const;
type Page = typeof pages[number];
const href = (page: Page) => page === 'home' ? '#/' : `#/${page}`;

function A({ page, className, children }: { page: Page; className?: string; children: ReactNode }) {
  return <a href={href(page)} className={className}>{children}</a>;
}

function Header() {
  const nav: [string, Page][] = [['Home', 'home'], ['Calendar', 'calendar'], ['Member guide', 'get-involved'], ['CLP and branches', 'our-clp']];
  return <header className="site-header"><div className="shell header-inner">
    <A page="home" className="brand"><img className="brand-mark" src="./labour-rose.png" alt="Labour rose" /><span><strong>Finchley &amp; Golders Green</strong><small>Labour Party</small></span></A>
    <nav aria-label="Primary navigation">{nav.map(([label, page]) => <A page={page} key={page}>{label}</A>)}</nav>
    <details className="mobile-menu"><summary aria-label="Open menu"><Menu size={22} /></summary><div>{nav.map(([label, page]) => <A page={page} key={page}>{label}</A>)}</div></details>
  </div></header>;
}

function Intro({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
  return <section className="page-intro"><div className="shell narrow"><p className="kicker"><span />{kicker}</p><h1>{title}</h1><p>{children}</p></div></section>;
}

function Home() {
  const cards = [
    { page: 'calendar' as Page, Icon: CalendarDays, small: 'Meetings and events', title: 'Calendar', copy: 'Dates for branch meetings, CLP meetings, campaigning and social events.', cta: 'View the calendar' },
    { page: 'get-involved' as Page, Icon: Landmark, small: 'Taking part', title: 'Member guide', copy: 'Voting, candidate selections, conference delegates and other ways to take part.', cta: 'Read the member guide' },
    { page: 'our-clp' as Page, Icon: UsersRound, small: 'How decisions are made', title: 'CLP and branches', copy: 'Our delegate structure, the three branches and a ward-based branch finder.', cta: 'View the CLP structure' },
  ];
  return <main><section className="hero"><div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" /><div className="shell hero-grid">
    <div><h1>Member handbook</h1><p className="hero-intro">Information for members of Finchley &amp; Golders Green Labour Party.</p><div className="hero-actions"><A page="calendar" className="button button-primary">View the calendar <ArrowRight size={18} /></A><A page="our-clp" className="button button-ghost">Find your branch</A></div></div>
    <aside className="notice-card"><p className="notice-label">Start here</p><h2>Three first steps</h2><ol><li><span>1</span><div><strong>Find your branch</strong><small>Your ward decides which branch you belong to.</small></div></li><li><span>2</span><div><strong>Attend a meeting</strong><small>Dates and details are in the calendar.</small></div></li><li><span>3</span><div><strong>Take part</strong><small>Campaign, vote in Party ballots, attend events or suggest a speaker.</small></div></li></ol></aside>
  </div></section>
  <section className="pathways shell"><div className="section-heading"><div><h2>Information for members</h2></div></div><div className="card-grid">{cards.map(({ page, Icon, small, title, copy, cta }) => <A page={page} className="path-card" key={page}><span className="icon-tile"><Icon size={24} /></span><small>{small}</small><h3>{title}</h3><p>{copy}</p><strong>{cta} <ArrowRight size={17} /></strong></A>)}</div></section></main>;
}

function Calendar() {
  return <main className="content-page"><Intro kicker="Meetings and events" title="Calendar">Dates for branch meetings, CLP meetings, campaigning and social events.</Intro><section className="shell embed-section"><div className="embed-heading"><div><CalendarDays size={22} /><h2>Upcoming events</h2></div><a href="https://luma.com/calendar/cal-GocAPBW0BUOu5cK" target="_blank" rel="noreferrer">Open calendar in a new window <ExternalLink size={15} /></a></div><div className="calendar-frame"><iframe src="https://luma.com/embed/calendar/cal-GocAPBW0BUOu5cK/events" title="Finchley and Golders Green Labour events calendar" allowFullScreen /></div><p className="embed-note">If the calendar does not appear, use the link above.</p></section></main>;
}

const voteRows: [string, string, string][] = [
  ['CLP and branch officers', 'Once a year, at the AGM', 'In the room at the AGM'],
  ['Motions at meetings', 'Whenever one is tabled', 'In the room'],
  ['Conference delegates', 'Once a year', 'In the room'],
  ['Selections for public office', 'When a vacancy or trigger occurs', 'Postal or online ballot'],
  ['NEC and NPF representatives', 'On a national cycle', 'Ballot to you, or via delegates'],
  ['Leader and deputy leader', 'When a vacancy occurs', 'Ballot sent to you'],
];

const officerGroups: [string, [string, string][]][] = [
  ['Executive officers', [
    ['Chair', 'Runs meetings, keeps them to time and to the rules, and sets the agenda with the Secretary.'],
    ['Secretary', 'The engine room. Convenes meetings, sends the notices, keeps the minutes and is the CLP’s formal channel to the regional office.'],
    ['Vice Chair, Campaigns and Membership', 'Deputises for the Chair, and leads on campaigning and on growing and keeping our membership.'],
    ['Treasurer', 'Looks after the money and files what the law and the Party require. Election spending returns carry legal deadlines.'],
    ['Women’s Officer', 'Represents women members and supports the women’s forum.'],
    ['Trade Union Officer', 'Connects the CLP with affiliated unions locally.'],
  ]],
  ['Functional officers', [
    ['Political Education Officer', 'Organises the discussions, speakers and training.'],
    ['LGBT+ Officer', 'Represents LGBT+ members and links the CLP to LGBT+ Labour.'],
    ['BAME Officer', 'Represents Black, Asian and minority ethnic members.'],
    ['Policy Officer', 'Coordinates policy discussion locally and the CLP’s input into policy consultations.'],
    ['Youth Officer', 'Represents members under 27 and links to Young Labour.'],
  ]],
];

const vacantRoles: [string, string][] = [
  ['Disability Officer', 'Represents disabled members, and works on the accessibility of our meetings and campaigning.'],
  ['Communications Officer', 'Newsletters, social media and making sure members hear what is happening.'],
  ['Digital Coordinator', 'Looks after the CLP’s digital tools and data — including this handbook.'],
  ['Campaign Coordinator', 'Organises canvassing sessions and campaign days across the branches.'],
  ['Events and Fundraising Coordinator', 'Socials, fundraisers and events for members.'],
];

const jargon: [string, string][] = [
  ['Contemporary motion', 'A motion on one current policy subject, submitted by a CLP or an affiliate for debate at conference.'],
  ['Priorities ballot', 'Delegates vote on which of the submitted subjects are actually debated. Not everything submitted is heard.'],
  ['Compositing', 'Motions on the same subject are merged into a single composite motion, in meetings delegates attend.'],
  ['Conference Arrangements Committee', 'The committee that rules on what is in order and sets the timetable. Usually shortened to CAC.'],
  ['Card vote', 'A weighted vote in which CLP and affiliate votes are counted separately.'],
];

const delegateSteps = [
  ['Check you are eligible', 'You must have been an individual member for at least six months by the closing date, and be up to date with your subscription. The official call for each conference is the final authority.'],
  ['Apply through your branch', 'You can normally self-nominate or be nominated with your consent. Include your name, membership number, the role you seek and confirmation of eligibility.'],
  ['Branch nomination', 'Each branch considers applications and agrees which members to nominate to the General Committee (GC).'],
  ['GC selection', 'GC delegates agree the final delegation. Where a choice is needed, it is decided by secret ballot.'],
];

function SpeakerForm() {
  const [submitted, setSubmitted] = useState(false);
  return <div className="speaker-form-wrap">
    {submitted ? <div className="form-success" role="status"><CheckCircle2 /><div><h3>Suggestion received</h3><p>Thank you. The team will consider it when planning future meetings and events.</p></div></div> :
    <form className="speaker-form" action="https://docs.google.com/forms/d/e/1FAIpQLSckZN9P2Nn-S7wdts4D4ItGciXZIdhcG9Xyr8Ukj9vG6ZThsA/formResponse" method="post" target="speaker-form-response" onSubmit={() => window.setTimeout(() => setSubmitted(true), 500)}>
      <div className="form-field"><label htmlFor="speaker-topic">Topic or area for discussion <span aria-hidden="true">*</span></label><input id="speaker-topic" name="entry.2028351993" required /></div>
      <div className="form-field"><label htmlFor="speaker-name">Speaker or organisation <span aria-hidden="true">*</span></label><input id="speaker-name" name="entry.1597121774" required /></div>
      <div className="form-field"><label htmlFor="speaker-contact">Do you have a way to contact them? <span aria-hidden="true">*</span></label><textarea id="speaker-contact" name="entry.296198973" rows={3} required /></div>
      <div className="form-field"><label htmlFor="speaker-more">Anything else we should know? <span aria-hidden="true">*</span></label><textarea id="speaker-more" name="entry.1895512853" rows={4} required /></div>
      <p className="form-note"><span aria-hidden="true">*</span> All fields are required. Responses are sent to the CLP team through Google Forms.</p>
      <button className="button form-submit" type="submit">Send suggestion <ArrowRight size={17} /></button>
    </form>}
    <iframe className="form-response-frame" name="speaker-form-response" title="Speaker suggestion submission response" />
  </div>;
}

function Guide() {
  const navGroups: [string, [string, string][]][] = [
    ['Your vote', [['democracy', 'How party democracy works'], ['officers', 'CLP officers'], ['internal-elections', 'Internal Party elections'], ['selections', 'Selections']]],
    ['Raising something', [['local-motion', 'Ordinary local motions'], ['speakers', 'Suggest a speaker']]],
    ['Annual Conference', [['conference', 'What conference is'], ['conference-motion', 'Conference motions'], ['delegate', 'Being a delegate']]],
  ];
  return <main className="content-page"><Intro kicker="Member guide" title="How members can take part">Voting, selections, events, campaigning, conference and the formal routes for raising an issue.</Intro><section className="shell guide-layout">
    <aside className="guide-nav">{navGroups.map(([group, links]) => <div className="nav-group" key={group}><p>{group}</p>{links.map(([id, label]) => <a href={'#' + id} key={id}>{label}</a>)}</div>)}</aside>
    <div className="guide-content">

    <article id="democracy" className="guide-section"><span className="section-icon"><Landmark /></span><p className="eyebrow">Membership democracy</p><h2>How Party democracy works</h2>
      <p>Labour makes its decisions by members voting. What confuses people is that the votes happen at different levels, on different timetables, run by different people — so “when do I get a say?” has no single answer. This section is the map; the ones after it are the detail.</p>
      <p>Most decisions travel upwards: <b>you</b> → <b>your branch</b> → <b>the CLP</b> → <b>Annual Conference</b> → <b>the NEC and National Policy Forum</b>. A motion you write in your branch can end up debated at conference, and a delegate you elect carries the CLP’s vote there. Some decisions come the other way: selection timetables and leadership contests are set nationally, and the CLP runs its part rather than deciding when it happens.</p>
      <h3>What you get a vote on</h3>
      <div className="vote-list">{voteRows.map(([what, when, where]) => <div key={what}><strong>{what}</strong><small>{when}</small><small>{where}</small></div>)}</div>
      <h3>Am I eligible to vote in this?</h3>
      <p>The most common question of all. The answer depends on how long you have been a member, counted to a fixed cut-off called the <b>relevant date</b> or <b>freeze date</b>. If you qualified on that date you can take part, even if the vote itself happens later.</p>
      <ul className="check-list"><li><CheckCircle2 /><span><b>8 weeks’ continuous membership</b> — to attend and vote at branch and CLP meetings, and to stand for branch and CLP roles</span></li><li><CheckCircle2 /><span><b>6 months’ continuous membership</b> — to be a delegate to Annual Conference</span></li><li><CheckCircle2 /><span><b>12 months’ continuous membership</b> — for some national roles and elections</span></li></ul>
      <p>You also need to be up to date with your subscription: a member in arrears cannot vote at Party meetings. This is much easier to fix a fortnight before a meeting than on the night.</p>
      <p className="rule-note"><b>Nominating is not voting.</b> For most national elections the CLP meets and votes on who to <i>nominate</i>. That is a public endorsement, not the election. The ballot itself comes to you separately, and you are free to vote for someone else.</p>
    </article>

    <article id="officers" className="guide-section"><span className="section-icon"><UsersRound /></span><p className="eyebrow">Running the CLP</p><h2>CLP officers</h2>
      <p>Officers are elected by members at the Annual General Meeting, held once a year. Any member of eight weeks’ standing can vote and can stand. Each ward branch also elects its own officers at a branch AGM, usually in the weeks before — branch roles are a smaller commitment and are the normal way people start.</p>
      {officerGroups.map(([group, roles]) => <div key={group}><h3>{group}</h3><div className="officer-list">{roles.map(([role, copy]) => <div key={role}><h3>{role}</h3><p>{copy}</p></div>)}</div></div>)}
      <h3>Roles currently vacant</h3>
      <p>These posts are unfilled. If any of them sounds like something you would enjoy, it is genuinely available — speak to the Secretary or any officer.</p>
      <div className="officer-list vacant-list">{vacantRoles.map(([role, copy]) => <div key={role}><h3>{role} <span className="vacant-tag">Vacant</span></h3><p>{copy}</p></div>)}</div>
      <h3>How to stand</h3>
      <ol className="plain-steps">
        <li><b>Decide roughly what you would want to do.</b> If you are unsure, ask the current holder what the job is really like. Most will tell you honestly.</li>
        <li><b>Find a proposer.</b> Anyone eligible to vote in the CLP can propose you.</li>
        <li><b>Get your nomination in before the deadline.</b> The Secretary’s notice sets out the posts, the deadline and the format. The deadline is usually well before the meeting, and missing it is the most common reason people do not stand.</li>
        <li><b>Write a short statement.</b> A few sentences on why you want the role beats a CV.</li>
        <li><b>Turn up.</b> Contested posts involve a brief speech and then a vote.</li>
      </ol>
      <p className="rule-note">You do not need permission and you do not need years of membership. Eight weeks and a proposer is the whole requirement. Vacant posts can be filled between AGMs, so you do not always have to wait for the next one.</p>
    </article>

    <article id="internal-elections" className="guide-section"><span className="section-icon"><Vote /></span><p className="eyebrow">National ballots</p><h2>Internal Party elections</h2>
      <div className="motion-grid">
        <div><h3>National Executive Committee (NEC)</h3><p>The NEC is the Party’s national administrative authority, subject to Annual Conference. It oversees organisation, rules, elections and the running of the Party.</p><p>Eligible members vote directly for the seats allocated to individual members when a ballot is held. The Party emails ballot papers and the rules for that election. CLPs also make nominations through local meetings.</p></div>
        <div><h3>National Policy Forum (NPF)</h3><p>The NPF and its policy commissions develop the Party’s rolling policy programme for Annual Conference. Members can contribute through policy consultations and local policy discussions.</p><p>CLPs nominate their regional NPF representatives, and the relevant delegations at Annual Conference elect them by card vote. This is not normally a direct ballot of every member.</p></div>
      </div>
      <p>Leadership and deputy leadership contests also run nationally, on their own timetable, with a ballot sent to eligible members directly.</p>
      <p className="rule-note">Eligibility and timetables are set for each contest individually. Follow the instructions issued with that election, and check the freeze date if you joined recently.</p>
    </article>

    <article id="selections" className="guide-section"><span className="section-icon"><Users /></span><p className="eyebrow">Choosing candidates</p><h2>Selections for public office</h2>
      <p>Members also choose Labour’s candidates for public office: Member of Parliament, councillor, London Assembly Member and Mayor. These are separate from the internal elections above — different timetables, different electorates and their own rules each time.</p>
      <p>Selections are triggered by a vacancy or by a trigger process, and the timetable is set regionally or nationally rather than by the CLP. Eligible members living in the electoral area, normally with at least six months’ continuous membership, are entitled to take part unless the NEC approves an exception.</p>
      <ol className="plain-steps">
        <li><b>Watch for the official email.</b> Selections move quickly once opened, and the notice carries the rules for that contest.</li>
        <li><b>Attend the hustings.</b> Candidates make their case and take questions.</li>
        <li><b>Vote in the ballot.</b> Usually one member one vote, by post or online.</li>
      </ol>
      <p className="rule-note">Ballot eligibility and timetables change between contests. The instructions issued for the specific selection are always the authority.</p>
    </article>

    <article id="local-motion" className="guide-section"><span className="section-icon"><FilePenLine /></span><p className="eyebrow">Branch and GC business</p><h2>Ordinary local motions</h2>
      <p>A local motion is a formal way to ask a branch or the General Committee to take a position or action. It is most useful when a clear decision is actually needed. You can also raise questions, volunteer, join a discussion or suggest an activity without writing a motion.</p>
      <ol className="plain-steps">
        <li><b>Speak to your Branch Secretary first.</b> They can advise whether a motion is needed and tell you the agenda deadline.</li>
        <li><b>Keep it practical.</b> State the issue and the action requested, within the powers of the branch or CLP.</li>
        <li><b>Raise it through your branch.</b> In this delegate CLP, an agreed branch motion can be taken to the GC by the branch’s delegates.</li>
      </ol>
      <p className="rule-note">Motions to Annual Conference are a different thing with different rules — see <a href="#conference-motion">conference motions</a>.</p>
    </article>

    <article id="speakers" className="guide-section"><span className="section-icon"><Mic /></span><p className="eyebrow">Meetings and events</p><h2>Suggest a speaker</h2><p>Know someone members would benefit from hearing? Suggest a speaker or topic for a future CLP or branch event. A suggestion does not guarantee an invitation, but it helps the team plan a useful programme.</p><SpeakerForm /></article>

    <article id="conference" className="guide-section"><span className="section-icon"><Building2 /></span><p className="eyebrow">Annual Conference</p><h2>What conference is</h2>
      <p>Annual Conference is the Party’s sovereign decision-making body. It agrees policy, decides rule changes, hears the reports of the NEC and the National Policy Forum, and elects a number of national positions. CLPs are represented there by delegates that members elect — which is how a decision taken in a branch meeting in Finchley can end up as Party policy.</p>
      <p>Conference has its own vocabulary, and it puts people off more than the process itself does:</p>
      <div className="officer-list">{jargon.map(([term, copy]) => <div key={term}><h3>{term}</h3><p>{copy}</p></div>)}</div>
      <p className="rule-note">Two ways to take part: <a href="#conference-motion">send a motion</a>, or <a href="#delegate">go as a delegate</a>. They are separate processes with separate deadlines, and you can do either without the other.</p>
    </article>

    <article id="conference-motion" className="guide-section"><span className="section-icon"><Megaphone /></span><p className="eyebrow">Annual Conference</p><h2>Conference motions</h2>
      <p>A contemporary motion asks Annual Conference to consider one current policy subject. A CLP may submit one. It must be in writing, cover a single subject, be no more than 250 words, and not be substantially addressed by the NEC or NPF reports already.</p>
      <p>Because only one motion goes forward, it has to be agreed by the CLP rather than simply submitted by a member. Bring it through your branch in good time — a motion that arrives the week of the deadline rarely makes it.</p>
      <p><b>Local deadline:</b> a proposed conference motion must reach and be agreed by the September GC. Ask the CLP Secretary for the exact agenda deadline before drafting.</p>
      <p className="rule-note"><b>Emergency motions are exceptional.</b> They must concern an urgent matter that arose after the contemporary-motion deadline, and must meet the Conference Arrangements Committee’s own deadline and test.</p>
    </article>

    <article id="delegate" className="guide-section final-guide"><span className="section-icon"><Ticket /></span><p className="eyebrow">Annual Conference</p><h2>Being a delegate</h2>
      <p>Conference delegates represent the CLP in formal conference business: listening to debates, taking part in votes and ballots, and carrying local priorities into the wider Party. You need six months’ continuous membership, and at least every second delegate a CLP sends must be a woman — so the make-up of the delegation affects who can be elected in a given year.</p>
      <h3>How to apply</h3>
      <div className="process-list">{delegateSteps.map(([title, copy], i) => <div className="process-step" key={title}><span>{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div>
      <div className="draft-callout"><strong>Timetable — dates to be confirmed</strong><p>The cycle runs in this order: <b>applications</b> close, then <b>branch nominations</b>, then <b>GC selection</b>, then <b>Party accreditation</b>. Dates for the next conference will be published here once confirmed. Ask your Branch Secretary in the meantime, and check whether any costs are covered before you apply.</p></div>
      <h3>What delegates commit to</h3>
      <ul className="check-list two-col"><li><CheckCircle2 />Attend conference business while it is in session</li><li><CheckCircle2 />Take part in key votes and ballots</li><li><CheckCircle2 />Engage with briefings on CLP priorities</li><li><CheckCircle2 />Follow safeguarding and behaviour expectations</li><li><CheckCircle2 />Give members a written report after conference</li><li><CheckCircle2 />Answer questions at a GC meeting</li></ul>
    </article>

    </div>
  </section></main>;
}

const branchByWard: Record<string, string> = { 'Church End':'Church End, West Finchley & Woodhouse', 'West Finchley':'Church End, West Finchley & Woodhouse', 'Woodhouse':'Church End, West Finchley & Woodhouse', 'Golders Green':'Golders Green, Childs Hill & Cricklewood', 'Childs Hill':'Golders Green, Childs Hill & Cricklewood', 'Cricklewood':'Golders Green, Childs Hill & Cricklewood', 'East Finchley':'East Finchley & Hampstead Garden Suburb', 'Hampstead Garden Suburb':'East Finchley & Hampstead Garden Suburb' };

function BranchFinder() {
  const [ward, setWard] = useState('');
  return <div className="branch-finder"><label htmlFor="ward">Which ward do you live in?</label><select id="ward" value={ward} onChange={e => setWard(e.target.value)}><option value="">Choose your ward</option>{Object.keys(branchByWard).map(name => <option value={name} key={name}>{name}</option>)}</select><div className={`finder-result ${ward ? 'visible' : ''}`} aria-live="polite">{ward && <><small>Your branch is</small><strong>{branchByWard[ward]}</strong><p>Your membership address normally determines your ward. If you are unsure, check your membership record or contact the CLP.</p></>}</div></div>;
}

function OurClp() {
  const branches = [ ['01','Church End, West Finchley & Woodhouse','Church End · West Finchley · Woodhouse'], ['02','Golders Green, Childs Hill & Cricklewood','Golders Green · Childs Hill · Cricklewood'], ['03','East Finchley & Hampstead Garden Suburb','East Finchley · Hampstead Garden Suburb'] ];
  return <main className="content-page"><Intro kicker="CLP structure" title="How the CLP works">The CLP has three branches. Your ward decides which branch you belong to.</Intro><section className="shell structure-section"><div className="structure-flow"><div><span><UsersRound /></span><small>Members</small><strong>All members</strong><p>Attend and vote at their branch meeting</p></div><ArrowDown /><div><span><MapPin /></span><small>Three branches</small><strong>Branch meetings</strong><p>Discuss campaigns, nominations and motions</p></div><ArrowDown /><div><span><Building2 /></span><small>CLP</small><strong>General Committee</strong><p>Branch delegates make constituency-wide decisions</p></div></div><div className="explainer"><h2>What is a delegate structure?</h2><div><p>Every member can attend their branch meeting. Each branch chooses delegates to attend the General Committee (GC), the main constituency-wide decision-making meeting.</p><p>Raise an issue, motion, nomination or volunteering offer through your branch first.</p></div></div></section><section className="branch-section"><div className="shell"><div className="section-heading"><div><h2>The three branches</h2></div><p>Your membership address normally determines your branch.</p></div><div className="branch-grid">{branches.map(([n,name,wards]) => <article className="branch-card" key={n}><small>{n}</small><h3>{name}</h3><p>{wards}</p></article>)}</div></div></section><section className="finder-section shell"><div className="finder-copy"><h2>Find your branch</h2><p>Select the ward shown on your Labour Party membership record.</p><div className="ward-help"><h3>Not sure which ward you live in?</h3><p>Enter your postcode on WriteToThem to see your local councillors and representatives. Use the ward shown there in the branch finder.</p><a href="https://www.writetothem.com/" target="_blank" rel="noreferrer">Find my ward and representatives <ExternalLink size={17} /></a></div></div><BranchFinder /></section></main>;
}

function App() {
  const getPage = (): Page => { const slug = location.hash.replace(/^#\/?/, ''); return pages.includes(slug as Page) ? slug as Page : slug === '' ? 'home' : 'home'; };
  const [page, setPage] = useState<Page>(getPage);
  useEffect(() => { const onHash = () => { setPage(getPage()); window.scrollTo({ top: 0 }); }; addEventListener('hashchange', onHash); return () => removeEventListener('hashchange', onHash); }, []);
  const View = page === 'calendar' ? Calendar : page === 'get-involved' ? Guide : page === 'our-clp' ? OurClp : Home;
  return <><Header /><View /></>;
}

createRoot(document.getElementById('root')!).render(<App />);
