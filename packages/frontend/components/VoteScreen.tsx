import { Stack, Heading, Button, Image } from '@chakra-ui/react'

const VoteScreen = (): JSX.Element => {
  return (
    <Stack spacing={4} align="center">
      <Heading>Vote For Your President!</Heading>
      <Stack isInline spacing="8">
        <Stack spacing={4}>
          <Image
            boxSize="sm"
            src="https://bit.ly/sage-adebayo"
            alt="Segun Adebayo"
          />
          <Button>Vote</Button>
        </Stack>
        <Stack spacing={4}>
          <Image
            boxSize="sm"
            src="https://bit.ly/sage-adebayo"
            alt="Segun Adebayo"
          />
          <Button>Vote</Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default VoteScreen
