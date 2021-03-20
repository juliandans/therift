import React, {useState, useEffect} from 'react';
import { Heading, Text, Container, Center, Link, Textarea } from '@chakra-ui/react';
import { useQuill } from "react-quilljs";
// import { Redirect } from "react-router-dom" 
import 'quill/dist/quill.snow.css';

export default function Write(props) {
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

 
  const formats = [  'bold', 'italic', 'underline', 'strike',
  'align', 'list', 'indent',
  'size',
  'link', 'image', 'video',
  'clean',];
 
  const { quill, quillRef } = useQuill({ theme, modules, formats });
 
  const [ text, changetext ] = useState("");

  useEffect(()=>{
    if (quill) {
      quill.on('text-change', () => {
        changetext(quill.root.innerHTML);
      });
    }
  }, [quill]);

  return (
    <Container>
      <Center>
        <Heading as="h1">THE RIFT</Heading>
      </Center>
      <Text as="p">Chapter: {props.old}</Text>
      <Text as="p">New Chapter: {props.newch}</Text>
      <div ref={quillRef} />
      <div className="ql-snow">
        <div className="ql-editor" style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: quill && text}} />
      </div>
    </Container>
  );
}

// xhttp.open("POST", "demo_post2.asp", true);
// xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// xhttp.send("fname=Henry&lname=Ford");