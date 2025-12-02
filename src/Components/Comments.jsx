export default function Comments({ comment }) {
  return (
    <div className="w-full rounded-md border-2 border-slate-900 text-white p-3 mt-4 bg-slate-500">
      <div className="flex justify-between items-center">
       <div className="flex align-center gap-2">
         <img src={comment?.commentCreator?.photo} className="size[36px]" alt="" />
        <p>{comment?.commentCreator?.name}  </p>
       </div>
       <span className="text-slate-300 text-sm"> {comment?.createdAt}</span>
      </div>
      <div className="content px-2 ">
        {comment?.content}
      </div>
    </div>
  );
}
