import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react";

const stats = [
    {
        title: "Total Interns",
        value: "45",
        icon: "mdi:account-group",
        description: "Active interns",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
    },
    {
        title: "Present Today",
        value: "38",
        icon: "mdi:check-circle",
        description: "Checked in today",
        color: "text-green-600",
        bgColor: "bg-green-50",
    },
    {
        title: "Absent Today",
        value: "5",
        icon: "mdi:close-circle",
        description: "Not present",
        color: "text-red-600",
        bgColor: "bg-red-50",
    },
    {
        title: "On Leave",
        value: "2",
        icon: "mdi:calendar-remove",
        description: "Sick/Permit",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
    },
];

export default function Statistic() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {stat.title}
                        </CardTitle>
                        <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                            <Icon
                                icon={stat.icon}
                                className={`h-5 w-5 ${stat.color}`}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* {isLoading ? (
                                <Skeleton className="h-8 w-20" />
                            ) : (
                                <> */}
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {stat.description}
                        </p>
                        {/* </>
                            )} */}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
