import { Dispatch, SetStateAction, useState } from "react";
import { Check, Flag, OctagonAlert } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface License {
  name: string;
  description: string;
  permission: string[];
  condition: string[];
  limitation: string[];
}

// Project LICENSE Component
export function ProjectLICENSE({
  license,
  setLicense,
}: {
  license: any;
  setLicense: Dispatch<SetStateAction<any>>;
}) {
  const presetLicenses = [
    {
      name: "MIT License",
      description: "A permissive license that is short and to the point.",
      permission: [
        "Commercial use",
        "Distribution",
        "Modification",
        "Private use",
      ],
      condition: ["License and copyright notice"],
      limitation: ["Liability", "Warranty"],
    },
    {
      name: "GNU GPLv3",
      description:
        "A copyleft license that requires anyone who distributes your code to make the source available.",
      permission: [
        "Commercial use",
        "Distribution",
        "Modification",
        "Patent use",
        "Private use",
      ],
      condition: [
        "Disclose source",
        "License and copyright notice",
        "Same license",
      ],
      limitation: ["Liability", "Warranty"],
    },
    {
      name: "Apache License 2.0",
      description:
        "A permissive license that also provides an express grant of patent rights.",
      permission: [
        "Commercial use",
        "Distribution",
        "Modification",
        "Patent use",
        "Private use",
      ],
      condition: ["License and copyright notice", "State changes"],
      limitation: ["Trademark use", "Liability", "Warranty"],
    },
    {
      name: "Mozilla Public License 2.0",
      description: "A weak copyleft license that is simple to comply with.",
      permission: [
        "Commercial use",
        "Distribution",
        "Modification",
        "Patent use",
        "Private use",
      ],
      condition: [
        "Disclose source",
        "License and copyright notice",
        "Same license (file)",
      ],
      limitation: ["Trademark use", "Liability", "Warranty"],
    },
    {
      name: "BSD 3-Clause",
      description: "A permissive license with very limited restrictions.",
      permission: [
        "Commercial use",
        "Distribution",
        "Modification",
        "Private use",
      ],
      condition: ["License and copyright notice"],
      limitation: ["Liability", "Warranty"],
    },
  ];

  const [selectedLicense, setSelectedLicense] = useState(
    Object.keys(license).length === 0 ? presetLicenses[0] : license,
  );

  const handleLicenseChange = (value: string) => {
    const newLicense = presetLicenses.find((lic) => lic.name === value);
    if (newLicense) {
      setSelectedLicense(newLicense);
      setLicense?.(newLicense); // Call `setLicense` if provided
    }
  };

  return (
    <Card>
      <CardHeader className="px-4 pt-4">
        <CardTitle>Project LICENSE</CardTitle>
        <CardDescription>
          copyright / copyleft LICENSE for your project product.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedLicense.name}</CardTitle>
              {/* License Selection Dropdown */}
              <Select onValueChange={handleLicenseChange}>
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
            <div className="flex flex-col justify-evenly gap-x-5 gap-y-5 sm:flex-row">
              <ul className="space-y-2">
                <a className="text-lg font-bold">Permission</a>
                {selectedLicense.permission.map(
                  (item: string, index: number) => (
                    <li key={index} className="flex items-start space-x-1">
                      <Check className="mt-1 h-4 w-4 text-green-500" />
                      <div>
                        <a className="font-light">{item}</a>
                      </div>
                    </li>
                  ),
                )}
              </ul>
              <ul className="space-y-2">
                <a className="text-lg font-bold">Condition</a>
                {selectedLicense.condition.map(
                  (item: string, index: number) => (
                    <li key={index} className="flex items-start space-x-1">
                      <Flag className="mt-1 h-4 w-4 text-yellow-500" />
                      <div>
                        <a className="font-light">{item}</a>
                      </div>
                    </li>
                  ),
                )}
              </ul>
              <ul className="space-y-2">
                <a className="text-lg font-bold">Limitation</a>
                {selectedLicense.limitation.map(
                  (item: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <OctagonAlert className="mt-1 h-4 w-4 text-red-500" />
                      <div>
                        <a className="font-light">{item}</a>
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
