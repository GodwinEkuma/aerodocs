import * as React from "react"
import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme, useDisclosure,
} from "@chakra-ui/react"


import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import CallToActionWithIllustration from "./CallToActionWithIllustration";


export const App = () => (

  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
<CallToActionWithIllustration />
      </Grid>
    </Box>
  </ChakraProvider>
)
