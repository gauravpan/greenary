import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  StatHelpText,
} from '@chakra-ui/react'

export default function Stats() {
  return (
    <StatGroup>
      <Stat>
        <StatLabel>Total Views (this week)</StatLabel>
        <StatNumber>120</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          23.36%
        </StatHelpText>
      </Stat>

      <Stat>
        <StatLabel>Total Bids (this week)</StatLabel>
        <StatNumber>10</StatNumber>
        <StatHelpText>
          <StatArrow type="decrease" />
          9.05%
        </StatHelpText>
      </Stat>
      {/* <Stat>
          <StatLabel>Advanced payment (this week)</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat> */}
    </StatGroup>
  )
}
