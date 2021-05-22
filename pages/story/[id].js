import React from 'react';
import { omit } from 'lodash'
import { useRouter } from 'next/router'
import { Heading, Text, Container, Center, Link, Button, VStack, Box } from '@chakra-ui/react';
const Path = require('../../lib/models/Path')
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'


export default function Story(props) {
  const { push, query: { id } } = useRouter()
  const { converted, path, linkarrays } = props
  console.log('Path', path)

  const onClickBackButton = () => {
    push(`/story/${path.parent}`)
  }

  return (
    <Container>
      <Center>
        <Heading as="h1">THE RIFT</Heading>
      </Center>
      {/* <Button onClick={onClickBackButton}>Back one level</Button> */}
      <VStack>
        <div style={{whiteSpace:"pre-wrap"}} dangerouslySetInnerHTML={{ __html: props.converted }} />
        <Box>
            <br /><br />
          {linkarrays.map(q=><Center><Link color="blue.200" href={`../story/${q._id}`}  key={1}>{q.tldr}</Link> <br/></Center>)}
          
          <Link color="blue.300" href={"../write/"+id}>Add New Path</Link>
            <br /><br />
        </Box>
      </VStack>

    </Container>
  );
}
/**
 * This ONLY runs the first time the page is loaded on the server!
 */
export async function getServerSideProps(context) {
  const path = await Path.findById(context.params.id)
  const converter = new QuillDeltaToHtmlConverter(path.body.ops, {});
  const converted = converter.convert()
  const mongoose = require('mongoose')

console.log(path)
  // path._id is a Mongo ObjectID which cannot be serialized as a prop
  // so you have to remove the _id property of path before passing it to the props
  const linkarrays = await Path.find({ parent: mongoose.Types.ObjectId( context.params.id ) }, 'tldr').exec();
  console.log("link arrays")
  console.log (linkarrays)
  const linkArraysWithStringIds = linkarrays.map(item => JSON.parse(JSON.stringify(item)))

  console.log("LINK ARRAYS WITH STRING IDs")
  console.log(linkArraysWithStringIds)

  return {
    props: {
      converted,
      path: path.body.ops.map((x, index) => {
        console.log("MAPPING THE BODY OPS")
        console.log(`ON OP # ${index}`)
        console.log("THIS IS THE OP")
        console.log(x)
        const returnableResult = JSON.parse(JSON.stringify(x))
        console.log("GOT THE RETURNABLE RESULT")
        console.log(returnableResult)
        return returnableResult
      }),
      linkarrays: linkArraysWithStringIds
    }
  }
}
