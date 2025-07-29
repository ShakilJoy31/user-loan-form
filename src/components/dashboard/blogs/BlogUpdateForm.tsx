"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";
import Input from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { XCircle } from "lucide-react";
import { useAddThumbnailMutation } from "@/redux/features/file/fileApi";
import { useUpdatePostMutation, useGetPostByIdQuery } from "@/redux/features/blog/blogPostApi";
import { useGetBlogCategoriesQuery } from "@/redux/features/blog/blogCategoryApi";
import { useGetBlogTagsQuery } from "@/redux/features/blog/blogTagApi";
import { ApiError } from "@/types/apiError";
import toast from "react-hot-toast";
import InputWrapper from "@/components/common/Wrapper/InputWrapper";
import ButtonLoader from "@/components/common/ButtonLoader";
import SearchableSelect from "./SearchableSelect";
import TextArea from "@/components/ui/text-area";
import TipTapEditor from "../tiptap/TipTapEditor";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import DataLoader from "@/components/common/DataLoader";

// Zod Schema
export const blogSchema = z.object({
    status: z.enum(["Draft", "Trust", "Published"]),
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    categoryId: z.number().min(1, "Category is required"),
    tagId: z.number().min(1, "Tag is required"),
    content: z.string().min(1, "Content is required"),
    image: z.string().url("Invalid URL").optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    alt: z.string().optional(),
});

export type BlogFormData = z.infer<typeof blogSchema>;

interface BlogFormProps {
    onSuccess?: () => void;
}

const BlogUpdateForm = ({ onSuccess }: BlogFormProps) => {
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
    const [addThumbnail, { isLoading: uploadLoading }] = useAddThumbnailMutation();

    const [preview, setPreview] = useState<string | null>(null);
    const [uploadedImage, setUploadedImage] = useState<File | undefined>(undefined);
    const [, setSearchQuery] = useState({ category: "", tag: "" });

    const { data: categoryList, isLoading: categoryLoading } = useGetBlogCategoriesQuery({});
    const { isLoading: tagLoading } = useGetBlogTagsQuery({});

    const {
        data: postData,
        isLoading: isPostLoading,
        isError,
        error: postError,
    } = useGetPostByIdQuery(id);

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        setError,
        clearErrors,
        reset,
    } = useForm<BlogFormData>({
        defaultValues: {
            status: "Published",
            title: "",
            author: "",
            categoryId: undefined,
            tagId: undefined,
            content: "",
            image: "",
            seoTitle: "",
            seoDescription: "",
            alt: "",
        },
    });

    // Pre-fill form when data is loaded
    // Pre-fill form when data is loaded
    useEffect(() => {
        if (postData?.data) {
            const blog = postData.data;
            setValue("status", blog.status as "Draft" | "Published" | "Trust");
            setValue("title", blog.title);
            setValue("author", blog.author);
            setValue("categoryId", blog.categoryId);
            setValue("tagId", blog.tagId);
            setValue("content", blog.content); // This is the key line
            setValue("image", blog.image);
            setValue("seoTitle", blog.seoTitle || "");
            setValue("seoDescription", blog.seoDescription || "");

            if (blog.image) {
                setPreview(blog.image);
            }
        }
    }, [postData, setValue]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setUploadedImage(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setValue("image", URL.createObjectURL(selectedFile));
        }
    };

    const handleReset = () => {
        if (postData?.data) {
            const blog = postData.data;
            reset({
                status: blog.status as "Draft" | "Published" | "Trust",
                title: blog.title,
                author: blog.author,
                categoryId: blog.categoryId,
                tagId: blog.tagId,
                content: blog.content,
                image: blog.image,
                seoTitle: blog.seoTitle || "",
                seoDescription: blog.seoDescription || "",
                alt: "",
            });
            setPreview(blog.image || null);
        }
        setUploadedImage(undefined);
        setSearchQuery({ category: "", tag: "" });
        onSuccess?.();
    };

    const onSubmit = async (data: BlogFormData) => {
        try {
            // Validate with Zod first
            const validatedData = blogSchema.parse(data);

            let imageUrl = validatedData.image || "";

            // Upload image if new file was selected
            if (uploadedImage) {
                try {
                    const formData = new FormData();
                    formData.append("image", uploadedImage);

                    if (validatedData.alt) {
                        formData.append("alt", validatedData.alt);
                    }

                    const response = await addThumbnail(formData).unwrap();
                    imageUrl = response?.data|| "";
                } catch (error) {
                    const apiError = error as ApiError;
                    toast.error(apiError?.data?.message || 'Image upload failed');
                    return;
                }
            }

            const payload = {
                status: validatedData.status,
                title: validatedData.title,
                author: validatedData.author,
                categoryId: validatedData.categoryId,
                tagId: validatedData.tagId,
                content: validatedData.content,
                image: imageUrl,
                seoTitle: validatedData.seoTitle,
                seoDescription: validatedData.seoDescription,
            };
            await updatePost({ id: postData?.data?.id, ...payload }).unwrap();
            toast.success("Blog post updated successfully");
            handleReset();
        } catch (error) {
            if (error instanceof z.ZodError) {
                error.issues.forEach((issue) => {
                    const fieldName = issue.path[0] as keyof BlogFormData;
                    setError(fieldName, {
                        type: "manual",
                        message: issue.message,
                    });
                });
            } else {
                const apiError = error as ApiError;
                toast.error(apiError?.data?.message || 'Failed to update blog post');
            }
        }
    };

    if (isPostLoading) {
        return <div className="flex justify-center mt-6"><DataLoader /></div>;
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-64 text-red-500">
                Error: {(postError as ApiError)?.data?.message || "Failed to load blog post"}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-6">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-semibold">Update Your Blog</h1>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        type="submit"
                        disabled={uploadLoading || isUpdating}
                        className="px-4 py-2 bg-[#F53E32] text-white font-semibold rounded hover:bg-[#F53E32] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Update {(uploadLoading || isUpdating) && <ButtonLoader />}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Status Select */}
                <InputWrapper
                    label="Status"
                    labelFor="status"
                    error={errors.status?.message}
                >
                    <Select
                        value={watch("status")}
                        onValueChange={(val: "Draft" | "Published" | "Trust") => {
                            setValue("status", val);
                            clearErrors("status");
                        }}
                    >
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Select status..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Published">Published</SelectItem>
                            <SelectItem value="Trust">Trust</SelectItem>
                        </SelectContent>
                    </Select>
                </InputWrapper>

                {/* Title */}
                <InputWrapper
                    label="Title"
                    labelFor="title"
                    error={errors.title?.message}
                >
                    <Input
                        placeholder="Enter blog title"
                        value={watch("title")}
                        onChange={(e) => {
                            setValue("title", e.target.value);
                            clearErrors("title");
                        }}
                        errorMessage={errors.title?.message}
                    />
                </InputWrapper>

                {/* Author */}
                <InputWrapper
                    label="Author"
                    labelFor="author"
                    error={errors.author?.message}
                >
                    <Input
                        placeholder="Enter author name"
                        value={watch("author")}
                        onChange={(e) => {
                            setValue("author", e.target.value);
                            clearErrors("author");
                        }}
                        errorMessage={errors.author?.message}
                    />
                </InputWrapper>

                {/* Category */}
                <InputWrapper
                    label="Category"
                    labelFor="category"
                    error={errors.categoryId?.message}
                >
                    <SearchableSelect
                        label="Category"
                        labelFor="product_category"
                        value={watch("categoryId")?.toString()}
                        onValueChange={(value) => {
                            setValue("categoryId", +value);
                            clearErrors("categoryId");
                        }}
                        options={categoryList?.data ?? []}
                        error={errors?.categoryId?.message}
                        loading={categoryLoading}
                        labelKey="name"
                    />
                </InputWrapper>

                {/* Tag Select */}
                <InputWrapper
                    label="Tag"
                    labelFor="tag"
                    error={errors.tagId?.message}
                >
                    <SearchableSelect
                        label="Tag"
                        labelFor="product_tag"
                        value={watch("tagId")?.toString()}
                        onValueChange={(value) => {
                            setValue("tagId", +value);
                            clearErrors("tagId");
                        }}
                        options={categoryList?.data ?? []}
                        error={errors?.tagId?.message}
                        loading={tagLoading}
                        labelKey="name"
                    />
                </InputWrapper>

                {/* SEO Title */}
                <InputWrapper
                    label="SEO Title"
                    labelFor="seoTitle"
                    error={errors.seoTitle?.message}
                >
                    <Input
                        placeholder="Enter SEO title"
                        value={watch("seoTitle") || ""}
                        onChange={(e) => {
                            setValue("seoTitle", e.target.value);
                            clearErrors("seoTitle");
                        }}
                        errorMessage={errors.seoTitle?.message}
                    />
                </InputWrapper>

                {/* SEO Description */}
                <InputWrapper
                    label="SEO Description"
                    labelFor="seoDescription"
                    error={errors.seoDescription?.message}
                >
                    <TextArea
                        placeHolder="Enter SEO description"
                        currentValue={watch("seoDescription") || ""}
                        onChange={(e) => {
                            setValue("seoDescription", e.target.value);
                            clearErrors("seoDescription");
                        }}
                        errorMessage={errors.seoDescription?.message}
                        row={5}
                    />
                </InputWrapper>

                {/* Image Upload */}
                <div>
                    <InputWrapper label={"Upload Image"}>
                        <div className="border-2 border-dashed rounded-md py-3 px-3 bg-white dark:bg-gray-800">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-[#F53E32] file:text-white
                hover:file:bg-[#d4352a] transition-colors"
                            />
                        </div>
                    </InputWrapper>

                    {/* Preview of Uploaded Image */}
                    {preview && (
                        <div className="relative w-20 h-20 border rounded-md overflow-hidden mt-2">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                onClick={() => {
                                    setPreview(null);
                                    setUploadedImage(undefined);
                                    setValue("image", "");
                                }}
                            >
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Alt Text */}
                <InputWrapper
                    label="Alt Text (Optional)"
                    labelFor="alt"
                    error={errors.alt?.message}
                >
                    <Input
                        placeholder="Enter alt text for image (optional)"
                        value={watch("alt") || ""}
                        onChange={(e) => {
                            setValue("alt", e.target.value);
                            clearErrors("alt");
                        }}
                        errorMessage={errors.alt?.message}
                    />
                </InputWrapper>
            </div>

            {/* Content */}
            {/* Content */}
            <div className="mt-10">
                <InputWrapper
                    label="Content"
                    labelFor="content"
                    error={errors.content?.message}
                >
                    {watch("content") && (
                        <TipTapEditor
                            key={watch("content")} // This forces remount when content changes
                            content={watch("content")}
                            onUpdate={(content) => {
                                setValue("content", content);
                                clearErrors("content");
                            }}
                        />
                    )}
                </InputWrapper>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <Button
                    variant="outline"
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Reset
                </Button>
                <Button
                    variant="outline"
                    type="submit"
                    disabled={uploadLoading || isUpdating}
                    className="px-4 py-2 bg-[#F53E32] text-white font-semibold rounded hover:bg-[#F53E32] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Update {(uploadLoading || isUpdating) && <ButtonLoader />}
                </Button>
            </div>
        </form>
    );
};

export default BlogUpdateForm;