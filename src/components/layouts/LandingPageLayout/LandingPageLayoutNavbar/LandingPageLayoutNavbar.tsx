import {
  Avatar,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Listbox,
  ListboxItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spinner,
} from "@nextui-org/react";
import Link from "next/link";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constant";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { Fragment } from "react";
import { IEvent } from "@/types/Event";
import Image from "next/image";

const LandingPageLayoutNavbar = () => {
  const router = useRouter();
  const session = useSession();
  const {
    dataProfile,
    handleSearch,
    dataEventsSearch,
    isLoadingEventsSearch,
    isRefetchingEventsSearch,
    search,
    setSearch,
  } = useLandingPageLayoutNavbar();
  return (
    <Navbar maxWidth="full" isBordered isBlurred={false} shouldHideOnScroll>
      <div className="flex items-center gap-8">
        <NavbarBrand as={Link} href="/">
          <Image
            src="/images/general/logo.svg"
            alt="logo"
            width={100}
            height={50}
            className="cursor-pointer"
          />
        </NavbarBrand>
        <NavbarContent className="hidden lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavbarItem
              key={`nav-${item.label}`}
              as={Link}
              href={item.href}
              className={cn("font-medium text-default-700 hover:text-danger", {
                "font-bold text-danger-500": router.pathname === item.href,
              })}
            >
              {item.label}
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>
      <NavbarContent justify="end">
        <NavbarMenuToggle className="lg:hidden" />
        <NavbarItem className="hidden lg:flex relative">
          <Input
            isClearable
            className="w-[300px]"
            placeholder="Search Event"
            startContent={<CiSearch />}
            onClear={() => setSearch("")}
            onChange={handleSearch}
          />
          {search !== "" && (
            <div className="absolute left-0 top-full z-50 w-full">
              {" "}
              {/* Wrapper div untuk positioning yang lebih aman */}
              <Listbox
                aria-label="Search Results"
                className="mt-2 w-full rounded-medium border bg-white p-2 shadow-lg"
                emptyContent="No events found." // Tampilkan ini jika data kosong dan tidak loading
              >
                {/* 1. KONDISI LOADING */}
                {isLoadingEventsSearch || isRefetchingEventsSearch ? (
                  <ListboxItem
                    key="loading"
                    isReadOnly
                    className="flex h-20 items-center justify-center"
                  >
                    <div className="flex w-full justify-center">
                      <Spinner color="danger" size="sm" />
                    </div>
                  </ListboxItem>
                ) : (
                  // 2. KONDISI RENDERING DATA MANUAL (Tanpa prop items di Listbox)
                  (dataEventsSearch?.data || []).map((item: IEvent) => (
                    <ListboxItem
                      key={item._id}
                      href={`/event/${item.slug}`}
                      textValue={item.name} // Penting untuk aksesibilitas
                      as={Link} // Agar item berfungsi sebagai link
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative h-10 w-16 flex-shrink-0">
                          <Image
                            src={`${item.banner}`}
                            alt={`${item.name}`}
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="truncate text-small font-bold">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </ListboxItem>
                  ))
                )}
              </Listbox>
            </div>
          )}
        </NavbarItem>
        {session.status === "authenticated" ? (
          <NavbarItem className="hidden lg:block">
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  src={dataProfile?.profilePicture}
                  className="cursor-pointer"
                  showFallback
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="admin"
                  href="/admin/dashboard"
                  className={cn({
                    hidden: dataProfile?.role !== "admin",
                  })}
                >
                  Admin
                </DropdownItem>
                <DropdownItem key="profile" href="/member/profile">
                  Profile
                </DropdownItem>
                <DropdownItem key="signout" onPress={() => signOut()}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <div className="hidden lg:flex lg:gap-4">
            {BUTTON_ITEMS.map((item) => (
              <NavbarItem key={`button-${item.label}`}>
                <Button
                  as={Link}
                  color="danger"
                  href={item.href}
                  variant={item.variant as ButtonProps["variant"]}
                >
                  {item.label}
                </Button>
              </NavbarItem>
            ))}
          </div>
        )}

        <NavbarMenu className="gap-4">
          {NAV_ITEMS.map((item) => (
            <NavbarMenuItem
              key={`nav-${item.label}`}
              className={cn("font-medium text-default-700 hover:text-danger", {
                "font-bold text-danger": router.pathname === item.href,
              })}
            >
              <Link href={item.href}>{item.label}</Link>
            </NavbarMenuItem>
          ))}
          {session.status === "authenticated" ? (
            <Fragment>
              <NavbarMenuItem
                className={cn(
                  "font-medium text-default-700 hover:text-danger",
                  {
                    hidden: dataProfile?.role !== "admin",
                  },
                )}
              >
                <Link href="/admin/dashboard">Admin</Link>
              </NavbarMenuItem>
              <NavbarMenuItem className="font-medium text-default-700 hover:text-danger">
                <Link href="/member/dasboard">Profile</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Button
                  color="danger"
                  onPress={() => signOut()}
                  className="mt-2 w-full"
                  variant="bordered"
                  size="md"
                >
                  Log Out
                </Button>
              </NavbarMenuItem>
            </Fragment>
          ) : (
            <Fragment>
              {BUTTON_ITEMS.map((item) => (
                <NavbarMenuItem key={`button${item.label}`}>
                  <Button
                    as={Link}
                    color="danger"
                    href={item.href}
                    fullWidth
                    variant={item.variant as ButtonProps["variant"]}
                    size="md"
                  >
                    {item.label}
                  </Button>
                </NavbarMenuItem>
              ))}
            </Fragment>
          )}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;
