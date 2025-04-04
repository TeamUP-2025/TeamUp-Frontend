"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CreditCard } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { useToast } from "~/hooks/use-toast"
import {createDonation} from "~/action/project";
import {useAuth} from "~/context/AuthContext";


const formSchema = z.object({
    amount: z.string().min(1, "Amount is required"),
    cardName: z.string().min(2, "Name is required"),
    cardNumber: z
        .string()
        .min(16, "Card number must be at least 16 digits")
        .max(19, "Card number must be at most 19 digits"),
    expiryMonth: z.string().min(1, "Month is required"),
    expiryYear: z.string().min(1, "Year is required"),
    cvc: z.string().min(3, "CVC must be at least 3 digits").max(4, "CVC must be at most 4 digits"),
})

export default function DonationForm({ projectId }: { projectId: string }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()
    const auth = useAuth()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: "",
            cardName: "",
            cardNumber: "",
            expiryMonth: "",
            expiryYear: "",
            cvc: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        // Simulate API call
        console.log(projectId)
        console.log(auth.uid)
        console.log(values.amount)
        const donatation = await createDonation(projectId, auth.uid, values.amount)

        setIsSubmitting(false)

        toast({
            title: "Donation successful",
            description: `Thank you for your donation of $${values.amount}`,
        })

        form.reset()
    }

    return (
        <div>
        <Card className={"align-middle"}>
            <CardHeader>
                <CardTitle>Donation Details</CardTitle>
                <CardDescription>Enter your donation amount and payment information</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Donation Amount ($)</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                            <Input type="number" placeholder="50" className="pl-7" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormDescription>Enter the amount you would like to donate</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <CreditCard className="mr-2 h-4 w-4" />
                                <h3 className="text-lg font-medium">Payment Information</h3>
                            </div>

                            <FormField
                                control={form.control}
                                name="cardName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name on Card</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Smith" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cardNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Card Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="4242 4242 4242 4242"
                                                {...field}
                                                onChange={(e) => {
                                                    // Only allow digits and spaces
                                                    const value = e.target.value.replace(/[^\d\s]/g, "")
                                                    field.onChange(value)
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="expiryMonth"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Month</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="MM" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Array.from({ length: 12 }, (_, i) => {
                                                        const month = (i + 1).toString().padStart(2, "0")
                                                        return (
                                                            <SelectItem key={month} value={month}>
                                                                {month}
                                                            </SelectItem>
                                                        )
                                                    })}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="expiryYear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Year</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="YY" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Array.from({ length: 10 }, (_, i) => {
                                                        const year = (new Date().getFullYear() + i).toString().slice(2)
                                                        return (
                                                            <SelectItem key={year} value={year}>
                                                                {year}
                                                            </SelectItem>
                                                        )
                                                    })}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cvc"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>CVC</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="123"
                                                    maxLength={4}
                                                    {...field}
                                                    onChange={(e) => {
                                                        // Only allow digits
                                                        const value = e.target.value.replace(/\D/g, "")
                                                        field.onChange(value)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Processing..." : "Donate Now"}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
        </div>
    )
}

