"use server"

import generateId from "@/lib/utils";
import { Session } from "./getSession";
import { db } from "@/lib/db";
import {
    S3Client,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import CsvReadableStream from "csv-reader";
import { chromium } from "playwright";
import fs from "fs"
const s3Client = new S3Client({
    region: process.env.S3_REGION!,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
    endpoint: process.env.S3_ENDPOINT,
});

export async function UploadFiles({ llmId, files }: { llmId: string, files: FormData }) {

    const session = await Session()

    if (!session) {
        return { error: "Invalid session!" };
    }

    try {
        files.forEach(async (value) => {
            //@ts-ignore
            const fileName: string = value.name
            //@ts-ignore
            const arrBuffer = await value.arrayBuffer();
            const buffer = Buffer.from(arrBuffer);

            const url = `${llmId}/${generateId()}.${fileName.split('.').pop()}`

            await s3Client.send(
                new PutObjectCommand({
                    Bucket: process.env.S3_BUCKET_NAME!,
                    Key: url,
                    Body: buffer
                }))

            const records = await db.lLM.findUnique({
                where: { id: llmId },
                select: { docs: true }
            })

            const docs = records?.docs.map((doc) => JSON.parse(doc));

            let newName = fileName

            const baseName = newName.replace(/(\(\d+\))?(\.\w+)$/, '');
            //@ts-ignore
            const extension = newName.match(/(\.\w+)$/)[0];

            let count = 1;

            while (docs?.some((doc) => doc.name === newName)) {
                newName = `${baseName} (${count})${extension}`;
                count++;
            }

            const docsObj = { name: newName, url, type: extension }

            await db.lLM.update({
                where: { id: llmId },
                data: {
                    docs: {
                        push: JSON.stringify(docsObj)
                    }
                }
            })

        })

        return { success: true, message: "Files uploaded successfully!" };

    } catch (error) {
        console.log(error)
        return { success: false, message: "Files could not be uploaded!, Please try again later." }
    }

}

export async function UploadCSVFiles({ llmId, files }: { llmId: string, files: FormData }) {

    const session = await Session()

    if (!session) {
        return { error: "Invalid session!" };
    }

    try {
        files.forEach(async (value) => {

            console.log(value);

            let inputStream = fs.createReadStream('./test.csv', 'utf8');

            inputStream
                .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
                .on('data', function (row) {
                    console.log('A row arrived: ', row);
                })
                .on('end', function () {
                    console.log('No more rows!');
                });

            //@ts-ignore
            // const arrBuffer = await value.arrayBuffer()
            // const buffer = Buffer.from(arrBuffer)

            //@ts-ignore
            // const fileName = value.name
            // const url = `${llmId}/${generateId()}.${fileName.split('.').pop()}`

            // await s3Client.send(
            //     new PutObjectCommand({
            //         Bucket: process.env.S3_BUCKET_NAME!,
            //         Key: url,
            //         Body: buffer
            //     }))

            // const records = await db.lLM.findUnique({
            //     where: { id: llmId },
            //     select: { docs: true }
            // })

            // const docs = records?.docs.map((doc) => JSON.parse(doc));

            // let newName = fileName

            // const baseName = newName.replace(/(\(\d+\))?(\.\w+)$/, '');
            // const extension = newName.match(/(\.\w+)$/)[0];

            // let count = 1;

            // while (docs?.some((doc) => doc.name === newName)) {
            //     newName = `${baseName} (${count})${extension}`;
            //     count++;
            // }

            // const docsObj = { name: newName, url, type: extension }

            // await db.lLM.update({
            //     where: { id: llmId },
            //     data: {
            //         docs: {
            //             push: JSON.stringify(docsObj)
            //         }
            //     }
            // })

        })

        return { success: true, message: "Files uploaded successfully!" };

    } catch (error) {
        console.log(error)
        return { success: false, message: "Files could not be uploaded!, Please try again later." }
    }

}

export async function UploadFileByUrl({ url, llmId }: { url: string, llmId: string }) {
    const session = await Session()

    if (!session) {
        return { error: "Invalid session!" };
    }

    try {
        const browser = await chromium.launch({
            headless: true,
        });
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: "domcontentloaded",
        });
        const textContent = await page.innerText('html');
        await browser.close();
        const regex = new RegExp("\n", "g");
        const response = textContent.replace(regex, "").replace(/\s{2,}/g, ' ');
        const enc = new TextEncoder();
        const buffer = Buffer.from(enc.encode(response))

        const fileUrl = `${llmId}/${generateId()}.txt`
        await s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME!,
                Key: fileUrl,
                Body: buffer
            }))

        const records = await db.lLM.findUnique({
            where: { id: llmId },
            select: { docs: true }
        })

        const docs = records?.docs.map((doc) => JSON.parse(doc));

        let newName = url;

        let count = 1;

        while (docs?.some((doc) => doc.name === newName)) {
            newName = `${url} (${count})`;
            count++;
        }

        const docsObj = { name: newName, url: fileUrl, type: ".txt" }

        await db.lLM.update({
            where: { id: llmId },
            data: {
                docs: {
                    push: JSON.stringify(docsObj)
                }
            }
        })

        return { success: true, message: "File uploaded successfully!" };

    } catch (error) {
        console.log(error)
        return { success: false, message: "File could not be uploaded!, Please try again later." }
    }
}