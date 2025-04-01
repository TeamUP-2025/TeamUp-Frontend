"use client";

import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

interface ProjectSearchProps {
  allTags: string[];
  allLicenses: string[];
  allStatuses: string[];
  initialValues: {
    title: string;
    status: string;
    licenseName: string;
    selectedTags: string[];
  };
}

export function ProjectSearch({
  allTags,
  allLicenses,
  allStatuses,
  initialValues,
}: ProjectSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [title, setTitle] = useState(initialValues.title);
  const [status, setStatus] = useState(initialValues.status);
  const [licenseName, setLicenseName] = useState(initialValues.licenseName);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialValues.selectedTags
  );
  const [showFilters, setShowFilters] = useState(false);

  // Update URL and trigger search when any search parameter changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove title parameter
    if (title) {
      params.set("title", title);
    } else {
      params.delete("title");
    }

    // Update or remove status parameter
    if (status && status !== "all") {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    // Update or remove license parameter
    if (licenseName && licenseName !== "all-licenses") {
      params.set("licenseName", licenseName);
    } else {
      params.delete("licenseName");
    }

    // Update tag parameters
    params.delete("tagNames");
    if (selectedTags.length > 0) {
      selectedTags.forEach((tag) => {
        params.append("tagNames", tag);
      });
    }

    // Navigate to new URL with updated parameters
    router.push(`/index?${params.toString()}`);
  }, [title, status, licenseName, selectedTags, router, searchParams]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by project title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle filters"
          >
            <Filter className={showFilters ? "text-primary" : ""} />
          </Button>
        </div>

        {showFilters && (
          <div className="grid gap-4 pt-2 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {allStatuses.map((statusOption) => (
                    <SelectItem key={statusOption} value={statusOption}>
                      {statusOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">License</label>
              <Select value={licenseName} onValueChange={setLicenseName}>
                <SelectTrigger>
                  <SelectValue placeholder="All Licenses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-licenses">All Licenses</SelectItem>
                  {allLicenses.map((license) => (
                    <SelectItem key={license} value={license}>
                      {license}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Tags</label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
