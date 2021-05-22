import React, {useState, useEffect} from 'react';
import { Heading, Text, Container, Center, Button, Input } from '@chakra-ui/react';
import { useQuill } from "react-quilljs";
import { useRouter } from "next/router"
// import 'node-modules/quill/dist/quill.snow.css';
import { createPath } from '../../lib/client/api';


const theme = 'snow'; 
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
  
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ indent: '-1'}, { indent: '+1' }],
  
      [{ size: ['small', false, 'large', 'huge'] }],
      ['clean'],
    ],
  };

  const placeholder = "Body (ie. the actual story, ending with a choice of some sort)"
  const formats = [  'bold', 'italic', 'underline', 'strike',
  'align', 'list', 'indent',
  'size',
  'link', 'image', 'video',
  'clean',];


export default function Write(props) {
  const { push, query: {id} } = useRouter()

  const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder });
 
  const [ text, changetext ] = useState("");
  const [ tldr, changetldr ] = useState("");


  const submitStory = async () => {
    // console.log("SUBMITTING STORY")
    const { path } = await createPath({ body: quill.getContents(), parentId: id, tldr:tldr })
    console.log("SUBMITTING STORY:"+path)
    push(`/story/${path._id}`)

    // Redirect them back to story
  }

  return (
    <Container>
      <Center>
        <Heading as="h1">THE RIFT</Heading>
      </Center>
      <Input 
        borderRadius="0"
        borderColor="white"
        _focus={{
          outline:0
        }}
        _hover={{

        }}
        placeholder="Action (ie. Run Away or Open The Door)"
        onChange={i => changetldr(i)}
      />

      <Text as="p"></Text>
      <div ref={quillRef} />
      <div className="ql-snow">
        <div className="ql-editor" style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: quill && text}} />
      </div>
      <Text as="p"></Text>
      <Button onClick={submitStory}>Save</Button>
    </Container>
  );
}