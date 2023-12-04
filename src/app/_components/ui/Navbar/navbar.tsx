"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/app/_components/ui/navigation-menu";
import { cn } from "~/app/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function Navbar({}) {
  const session = useSession();
  const navBarLinks: {
    title: string;
    href: string;
    description: string;
    needAuth: boolean;
  }[] = [
    {
      title: "Blog",
      href: "/browse",
      description:
        "Read Ethan's Blog on anything and everything web development",
      needAuth: false,
    },
    {
      title: "Website Copies",
      href: "/bingo",
      description:
        "Take a look at modern UI/UX practices through a comprehensive suite of website copies",
      needAuth: false,
    },
  ];

  const NavSignInButton = ({ className }: { className?: string }) => (
    <li
      className={twMerge(
        "cursor-pointer rounded-lg bg-white dark:text-black px-3 py-1 transition-colors duration-300 hover:bg-slate-300",
        className,
      )}
      onClick={() => {
        if (session.status === "authenticated") signOut();
        else signIn();
      }}
    >
      {session.status === "authenticated" ? "Logout" : "Admin Login"}
    </li>
  );

  return (
    <nav className="sticky top-0 z-50 box-border flex h-fit w-full items-center justify-between bg-black p-3 dark:bg-white dark:text-black">
      <Link href={"/"} className="flex items-center gap-2 px-2">
        <Image
          className="rounded-[50%] bg-white"
          src={"/copierlogo.png"}
          width={50}
          height={50}
          alt="BingoVerse Logo"
        />
        <p className="hidden text-2xl font-bold tracking-widest text-white dark:text-black md:block">
          Copy Hub
        </p>
      </Link>
      {/* Div of links for larger devices */}
      <div>
        <ul className="flex gap-3">
          {navBarLinks.map((component) => {
            if (
              (component.needAuth && session.status === "authenticated") ||
              !component.needAuth
            ) {
              return (
                <Link
                  key={component.title}
                  href={component.href}
                  className="hidden rounded-lg bg-white px-3 py-1 transition-colors duration-300 hover:bg-slate-300 md:inline-block"
                  aria-description={component.description}
                >
                  <li>{component.title}</li>
                </Link>
              );
            }
            return null; // Return null if the component should not be rendered
          })}
          <NavSignInButton className="hidden md:inline-block" />
        </ul>
      </div>
      {/* Pretty nav menu for smaller viewports */}
      <NavigationMenu className="z-50 md:hidden">
        <NavigationMenuList>
          <NavigationMenuItem className="dark:text-white">
            <NavigationMenuTrigger>Things to Do</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-32">
                {navBarLinks.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
                <NavSignInButton className="bg-white py-2" />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
