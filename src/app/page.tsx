"use client"

import { Button, Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Limbo() {
    const [following, setFollowing] = useState<string[]>([]);
    const [followers, setFollowers] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false)

    const handleFollowing = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                const values = data.relationships_following.map((item: any) => item.string_list_data[0].value);
                setFollowing(values);
                setError(null); // clear any previous error
            } catch (error) {
                setError('impossibile leggere il file dei seguiti');
            }
        };
        reader.onerror = () => {
            setError('impossibile leggere il file dei seguiti');
        };
        reader.readAsText(file);
    };
    const handleFollowers = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                const values = data.map((item: any) => item.string_list_data[0].value);
                setFollowers(values);
                setError(null); // clear any previous error
            } catch (error) {
                setError('impossibile leggere il file dei follower');
            }
        };
        reader.onerror = () => {
            setError('impossibile leggere il file dei follower');
        };
        reader.readAsText(file);
    };
    const findDifferences = () => {
        return following.filter(value => !followers.includes(value));
    };
    const submit = () => {
        if(!following.length || !followers.length) {
            setError('carica entrambi i file');
            return;
        }

        const differences = findDifferences();
        const data = new Blob([differences.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(data);

        const link = document.createElement('a');
        link.download = 'output.txt';
        link.href = url;
        link.onclick = () => setSuccess(true);
        link.click();
    };

    return (
        <>
            <Flex direction={"column"} className={"min-h-screen mx-5 text-center"} justify={"center"} align={"center"}>
                <Text size={"6"} weight={"bold"} className={"select-none"}>chi non mi ricambia su instagram?</Text>
                <Text size={"4"} weight={"medium"} mt={"1"} className={"select-none"}>
                    by {" "}
                    <Link href={"https://instagram.com/albertocornacchia_"} className={"font-semibold text-red-700 sm:underline underline-none select-none"}>berto</Link>
                </Text>
                <br />
                <Flex direction={"column"} mx={"auto"} gap={"1"}><Text align={"left"} ml={"1"} className={"select-none"}>lista dei seguiti (.json)</Text>
                    <input onChange={handleFollowing} type={"file"} accept={".json"} />
                </Flex>
                <br />
                <Flex direction={"column"} mx={"auto"} gap={"1"}>
                    <Text align={"left"} ml={"1"} className={"select-none"}>lista dei follower (.json)</Text>
                    <input onChange={handleFollowers} type={"file"} accept={".json"} />
                </Flex>
                <br />
                <Button onClick={submit} radius={"full"} variant={"soft"} size={"3"}>
                    <Text mx={"3"} className={"select-none"}>invia</Text>
                </Button>
                <div className="my-3" />
                {error && <Text color={"red"} weight={"medium"} className={"select-none"}>errore: {error}</Text>}
                {success && <Text color={"green"} weight={"medium"} className={"select-none"}>successo: il download dovrebbe iniziare a breve</Text>}
            </Flex>
        </>
    )
}