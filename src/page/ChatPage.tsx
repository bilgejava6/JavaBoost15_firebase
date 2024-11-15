import React,{useEffect, useState} from 'react'
import { getDatabase, set, ref, onChildAdded, onChildChanged} from 'firebase/database'
interface IMessage{
  name: string,
  message: string
}
function ChatPage() {
  const [message, setmessage] = useState<string>('') 
  let messageList: IMessage[] = [];
  const [list,setList] = useState<IMessage[]>([]); 
  const db = getDatabase();
  const enter = (evt: React.KeyboardEvent)=>{
     let time = Date.now();
     if(evt.code === 'Enter'){
        set(ref(db, 'chat/'+ time),{
          name: 'muhammet',
          message: message
        })       
     }      
  }
  const rootRef = ref(db, '/chat');
  useEffect(()=>{
    onChildAdded(rootRef,(snapshot)=>{
      console.log(snapshot.val());
      messageList.push(snapshot.val());
      setList(messageList)
  })
  },[])
  

  return (
    <div className="container">
      <div className="row m-4 border rounded-3">
          <input onChange={evt=>setmessage(evt.target.value)} onKeyDown={enter} type="text" className='form-control' placeholder='message...' />
      </div>
      <div className="row mt-3">
            {
              list.map((ms, index)=>{
                return(
                  <label key={index} className='form-label'>{ms.name+ ' : '+ ms.message}</label>
                )
              })
            }
      </div>
    </div>
  )
}

export default ChatPage