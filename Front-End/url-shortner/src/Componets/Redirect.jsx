function Redirect(){

  // Here is a exaple for Checking Server Is Working Or not
  const [input ,setinput] = useState("B1YZoUjg")

  async function EnterURL(){
      try {
        const result = await fetch(`https://url-shortner-hzlh.onrender.com/${input}`)
        window.location =  result.url
      } catch (error) {
        console.log(error)
      }
  }

  
  return (
    <>
      <h1>Enter Your URL HERE FOR Redirect</h1>
      <input onChange={(e)=>setinput(e.target.value)} value={input} type="" name="" id="" />
      <button onClick={EnterURL}>GO</button>
      <Link to={"/create-url"}>Createulr</Link>
    </>
  )
}
export default Redirect