const API='/api';
export function getToken(){return localStorage.getItem('ec_token');}
export async function api(path,options={}) {
  const headers={'Content-Type':'application/json',...(options.headers||{})};
  if(getToken()) headers.Authorization=`Bearer ${getToken()}`;
  const response=await fetch(`${API}${path}`,{...options,headers});
  const data=await response.json().catch(()=>({message:'Unexpected server response'}));
  if(!response.ok) throw new Error(data.message||'Request failed');
  return data;
}
