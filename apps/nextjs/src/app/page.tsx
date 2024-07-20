import Image from "next/image";
import { BsChevronCompactDown } from "react-icons/bs";

import linkedOutLogo from "../../public/outLogo.png";
import { InstallButtons } from "./_components/install-buttons";

export default function HomePage() {
  return (
    <main className="m-8 flex min-h-screen flex-col gap-8 md:m-0">
      <div className="relative flex flex-col items-center justify-center gap-4 align-middle md:h-screen">
        <div className="m-auto flex flex-col gap-8">
          <Image
            src={linkedOutLogo}
            alt="LinkedOut Logo"
            height={500}
            width={500}
            className="mx-auto mt-4 w-1/2 md:size-52 md:p-0"
          />
          <h1 className="flex flex-col gap-8 text-8xl font-extrabold tracking-tight sm:text-[5rem]">
            <p>LinkedOut</p>
            <p>Dislikes for LinkedIn</p>
          </h1>
          <div>
            <p className="flex flex-col gap-2 text-3xl md:gap-0 md:text-center md:text-lg">
              <p>
                Have you ever found yourself wishing you could dislike a
                LinkedIn post? Now you can!
              </p>
              <br />
              <p>
                LinkedOut is a browser extension that adds dislike buttons to
                LinkedIn posts.
              </p>
            </p>
          </div>
          <InstallButtons />
          <div className="absolute bottom-0 right-0 mx-auto flex w-full justify-center gap-4 align-middle">
            {/* down arrow for faq to suggest there is more content */}
            <div className="mx-auto justify-center gap-4 align-middle">
              <div className="m-auto">Scroll Down For More Info</div>
              <BsChevronCompactDown className="m-auto size-8 animate-bounce opacity-75" />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-col gap-2 md:max-w-3xl">
        <article className="prose dark:prose-invert md:prose-lg prose-2xl">
          <h1>Frequently Asked Questions</h1>
          <ul>
            <li>
              <h2>What is LinkedOut?</h2>
              <p>
                LinkedOut is a browser extension that adds dislike buttons to
                LinkedIn posts.
              </p>
            </li>
            <li>
              <h2>How does LinkedOut work?</h2>
              <p>
                LinkedOut injects dislike buttons into posts on LinkedIn and
                then adds the count of dislikes to the post.
              </p>
            </li>
            <li>
              <h2>Is LinkedOut really anonymous?</h2>
              <p>
                LinkedOut works by storing a unique identifier in your browser
                which we use to check whether or not you've disliked a post
                before. We do not associate your name or LinkedIn account with
                this identifier, nor do we store any other personal information
                about you. This is done by design, so you can feel confident in
                your use of LinkedOut.
              </p>
            </li>
            <li>
              <h2>How can I trust LinkedOut?</h2>
              <p>
                LinkedOut is one of many extensions developed by{" "}
                <a href="https://j4a.uk">J4A Industries</a>. We've been
                developing browser extensions for many years and have many
                thousands of users using our extensions other every day. We try
                and limit the amount of data we collect and only collect what is
                necessary to provide the service and improve the product.
              </p>
            </li>
            <li>
              <h2>How can I get in touch with the LinkedOut team?</h2>
              <p>
                You can get in touch with the LinkedOut team by emailing us at{" "}
                <a href="mailto:help@linkedout.lol">help@linkedout.lol</a> for
                any questions or concerns you may have.
              </p>
            </li>
          </ul>
        </article>
      </div>
      <footer className="flex justify-center py-8">
        <p className="text-center">
          © {new Date().getFullYear()} J4A Industries. All rights reserved -
          Made with ❤️ in London
        </p>
      </footer>
    </main>
  );
}
