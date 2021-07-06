import {
  Container,
  Box,
  Image,
  HStack,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Layout({ children }) {
  const navRef = useRef(null);

  return (
    <Box>
      <style jsx global>
        {`
          html {
            background: var(--chakra-colors-gray-100);
          }
        `}
      </style>
      <Header />
      <Box ref={navRef} />
      <Nav navRef={navRef} />
      <Container maxW="container.lg" py="8">
        {children}
      </Container>
    </Box>
  );
}

const List = [
  { name: "Home", href: "/" },
  { name: "Market", href: "/market" },
  { name: "Explore", href: "/explore" },
  { name: "Settings", href: "/settings" },
];

function Nav({ navRef }) {
  const router = useRouter();
  const active = router.asPath;
  const [sticky, setSticky] = useState(false);

  function makeNavSticky() {
    var sticky = navRef.current?.offsetTop;
    if (window?.pageYOffset >= sticky) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", makeNavSticky);
    return () => window.removeEventListener("scroll", makeNavSticky);
  }, []);

  function NavItems() {
    return (
      <Container maxW="container.lg">
        <HStack as="nav" spacing="6" bg="white">
          {List.map(({ name, href }) => (
            <Link href={href} passHref>
              <Box
                as="a"
                color={active == href ? "gray.900" : "gray.600"}
                cursor="pointer"
                fontWeight="semibold"
                py="2"
                borderColor="black"
                borderBottomWidth={active == href ? "2px" : "0"}
                _hover={{ color: "gray.900" }}
                bg="white"
              >
                {name}
              </Box>
            </Link>
          ))}
        </HStack>
      </Container>
    );
  }
  return (
    <>
      <Box w="full" bg="white" borderBottomWidth="1px" borderColor="gray.100">
        <NavItems />
      </Box>
      <Box
        pos={sticky && "fixed"}
        d={sticky ? "block" : "none"}
        top="0"
        zIndex="1212"
        w="full"
        bg="white"
        borderBottomWidth="1px"
        borderColor="gray.100"
      >
        <NavItems />
      </Box>
    </>
  );
}

function Header() {
  return (
    <Box bg="white">
      <Container maxW="container.lg">
        <HStack py="2" justifyContent="space-between">
          {/* <Image boxSize="12" src="/logo.jpg" /> */}
          <Heading size="lg">Agro</Heading>
          <Box ml="auto">
            <Menu placement="bottom-end">
              <MenuButton>
                {/* <Image boxSize="8" rounded="full" bg="gray.300" />
                 */}
                <Avatar
                  name="Dan Abrahmov"
                  boxSize="8"
                  src="https://bit.ly/dan-abramov"
                />
              </MenuButton>
              <MenuList shadow="lg">
                <MenuGroup title="Profile">
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                  <MenuItem>Docs</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      </Container>
    </Box>
  );
}
