import Docker from 'dockerode';

async function createContainer(imgName:string,cmdExectuable:string[]) {
    const docker=new Docker();

   const container=await docker.createContainer({
     Image:imgName,
     Cmd:cmdExectuable,
     AttachStdin:true,
     AttachStdout:true,
     AttachStderr:true,
     Tty:false,
     OpenStdin:true
   });
    return container;
    

    
}
export default createContainer;