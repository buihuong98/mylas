import { firestore } from "@/libs/firestore"
import { NextResponse } from "next/server"

const TABLE_NAME = "bio"

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const result = await firestore
      .collection(TABLE_NAME)
      .doc(params.id)
      .get()
      .then((res) => res.data())
     if(!result){
      return NextResponse.json({error: "Not Found"}, {status: 404})
     }
    return NextResponse.json(result)
    
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    })
  }
}

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const body = await req.json()
  try {
    const doc = await firestore.collection(TABLE_NAME).doc(params.id)

    let result = await doc.set(body, {merge: true})

    return NextResponse.json(result)
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    })
  }
}
