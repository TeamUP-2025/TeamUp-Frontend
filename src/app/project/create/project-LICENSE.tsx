import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

import {
    Github,
    CheckCircle2,
    Circle,
    Clock,
    Check,
    Flag,
    OctagonAlert,
  } from "lucide-react";

import { useState } from "react";


export default function ProjectLICENSE({license, setLicense}){
    //todo: fetch available LICENSE
    const presetLicenses = [
        {
            name: "MIT License",
            description: "A permissive license that is short and to the point.",
            permission: ["Commercial use", "Distribution", "Modification", "Private use"],
            condition: ["License and copyright notice"],
            limitation: ["Liability", "Warranty"]
        },
        {
            name: "GPL License",
            description: "A strong copyleft license ensuring freedom to share and change software.",
            permission: ["Commercial use", "Distribution", "Modification", "Private use"],
            condition: ["Same license required", "Source code must be available"],
            limitation: ["Liability", "Warranty"]
        },
        {
            name: "Apache License 2.0",
            description: "A permissive license with an explicit grant of patent rights.",
            permission: ["Commercial use", "Distribution", "Modification", "Private use", "Patent use"],
            condition: ["License and copyright notice", "State changes"],
            limitation: ["Liability", "Warranty"]
        }
    ]

    const [selectedLicense, setSelectedLicense] = useState(Object.keys(license).length === 0 ? presetLicenses[0] : license);

    const handleLicenseChange = (value) => {
        const newLicense = presetLicenses.find(lic => lic.name === value);
        if (newLicense) {
            setSelectedLicense(newLicense);
            setLicense?.(newLicense); // Call `setLicense` if provided
        }
    };
    return(
        <Card>
                    <CardHeader>
                        <CardTitle>Project LICENSE</CardTitle>
                        <CardDescription>copyright / copyleft LICENSE for your project product.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Card>
                            <CardHeader>
                            <div className="flex items-center justify-between">
                    <CardTitle>{selectedLicense.name}</CardTitle>
                    {/* License Selection Dropdown */}
                    <Select onValueChange={(value) => setLicense(presetLicenses.find(lic => lic.name === value)!)}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select License" />
                        </SelectTrigger>
                        <SelectContent>
                            {presetLicenses.map((license) => (
                                <SelectItem key={license.name} value={license.name}>
                                    {license.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                        <CardDescription>{selectedLicense.description}</CardDescription>
                            </CardHeader>
                            <CardContent>

              <div
                className={
                  "flex flex-col justify-evenly gap-x-5 gap-y-5 sm:flex-row"
                }
              >
                <ul className="space-y-2">
                  <a className={"text-lg font-bold"}>Permission</a>
                  {selectedLicense.permission.map((item, index) => (
                    <li key={index} className="flex items-start space-x-1">
                      <Check className="text-green-500 mt-1 h-4 w-4" />
                      <div>
                        <a className={"font-light"}>{item}</a>
                      </div>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  <a className={"text-lg font-bold"}>Condition</a>
                  {selectedLicense.condition.map((item, index) => (
                    <li key={index} className="flex items-start space-x-1">
                      <Flag className="text-yellow-500 mt-1 h-4 w-4" />
                      <div>
                        <a className={"font-light"}>{item}</a>
                      </div>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  <a className={"text-lg font-bold"}>Limitation</a>
                  {selectedLicense.limitation.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <OctagonAlert className="text-red-500 mt-1 h-4 w-4" />
                      <div>
                        <a className={"font-light"}>{item}</a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
                            </CardContent>
                        </Card>
                        
                    </CardContent>
        </Card>
    )
}