import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Cameron Bowen</title>
        <meta
          name="description"
          content="I'm Cameron Bowen. I live in Kansas, where I take on the role of father, husband, and technology addict."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I'm Cameron Bowen. I live in Kansas, where I take on the role of father, husband, and technology addict.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                I've loved taking things apart and learning how systems work since I was a kid. 
                I've always had a fascination with computers and technology, and attempted to learn Ruby as a kid. 
                Despite my love for technology, I took an educational detour in the medical field.
              </p>
              <p>
                Along with my love of technology I always had a fascination with science in particular human anatomy and physiology.
                I attended University of West Florida and graduated with a Bachelor of Science in Clinical Laboratory Science.
                Unfortunately, I found the career path to be very limited and the job lacking in opportunities for real growth and innovation.
                After working in the hospital laboratory for several years I decided to move to Kansas to pursue opportunities in reference laboratories.
              </p>
              <p>
                Shortly after moving to Kansas I had the opportunity to start a new career in the MSP world for a small company that supported surgery centers and hospitals. 
                I enjoyed merging my knowledge of the medical field with the technology side and learned more about how the medical industry uses technology. 
                However, I felt constantly pulled toward application development and started down the track of becoming an Site Reliability Engineer.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href="https://github.com/wcameronbowen" icon={GitHubIcon} className="mt-4">
                Follow on GitHub
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/wcameronbowen/" icon={LinkedInIcon} className="mt-4">
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:me@wcameronbowen.com"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                me@wcameronbowen.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
