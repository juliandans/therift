import React from 'react';
import { omit } from 'lodash'
import { useRouter } from 'next/router'
import { Heading, Text, Container, Center, Link, Button } from '@chakra-ui/react';
const Path = require('../../lib/models/Path')
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'


export default function Story(props) {
  const { push, query: { id } } = useRouter()
  const { converted, path } = props
  console.log('Path', path)

  const onClickBackButton = () => {
    push(`/story/${path.parent}`)
  }

  return (
    <Container>
      <Center>
        <Heading as="h1">THE RIFT</Heading>
      </Center>
      <Button onClick={onClickBackButton}>Back one level</Button>
      <div dangerouslySetInnerHTML={{ __html: props.converted }} />
    </Container>
  );
}
/**
 * This ONLY runs the first time the page is loaded on the server!
 */
export async function getServerSideProps(context) {
  console.log(context)
  const path = await Path.findById(context.params.id)
  console.log("PATH"+path)
  console.log('Path')
  console.log(path)
  console.log("path.body :")
  console.log(path.body)
  const converter = new QuillDeltaToHtmlConverter(path.body.ops, {});
  console.log("CONVERTER")
  console.log(converter)
  console.log("CONVERTED")
  const converted = converter.convert()
  console.log(converted)

  // path._id is a Mongo ObjectID which cannot be serialized as a prop
  // so you have to remove the _id property of path before passing it to the props

  return {
    props: {
      converted,
      path: omit(path, ['_id'])
    }
  }
}
