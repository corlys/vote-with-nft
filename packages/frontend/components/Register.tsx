import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
  Stack,
} from '@chakra-ui/react'

const Register = () => {
  return (
    <Stack spacing={4}>
      <Heading>Register</Heading>
      <FormControl p={4}>
        <FormLabel>Label</FormLabel>
        <Input />
        <FormHelperText>Helper message</FormHelperText>
        <FormErrorMessage>Error message</FormErrorMessage>
        <Button variant="solid" size="md">
          Submit to IPFS
        </Button>
      </FormControl>
    </Stack>
  )
}

export default Register
