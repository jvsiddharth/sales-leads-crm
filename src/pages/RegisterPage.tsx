"use client";

import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import {
  registerSchema,
  type RegisterSchema,
} from "../schemas/auth.schema";

import { register } from "../services/auth.service";

import { useAuthStore } from "../store/auth.store";

export default function RegisterPage() {
  const navigate =
    useNavigate();

  const { setAuth } =
    useAuthStore();

  const [isLoading, setIsLoading] =
    useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver:
      zodResolver(
        registerSchema
      ),

    defaultValues: {
      role: "sales",
    },
  });

  async function onSubmit(
    values: RegisterSchema
  ) {
    try {
      setIsLoading(true);

      const response =
        await register(values);

      setAuth(
        {
          ...response.user,

          role:
            response.user
              .role,
        },

        response.token
      );

      toast.success(
        "CLEARANCE GRANTED",

        {
          style: {
            borderRadius:
              "0",

            background:
              "#111111",

            color:
              "#F4F4F0",

            border:
              "1px solid #FF3E00",

            fontFamily:
              "'Outfit', sans-serif",

            textTransform:
              "uppercase",

            fontSize:
              "12px",

            letterSpacing:
              "0.1em",
          },
        }
      );

      navigate(
        "/dashboard"
      );
    } catch (error) {
      if (
        error instanceof Error
      ) {
        toast.error(
          `ERR: ${error.message}`,

          {
            style: {
              borderRadius:
                "0",

              background:
                "#FF3E00",

              color:
                "#F4F4F0",

              fontFamily:
                "'Outfit', sans-serif",

              textTransform:
                "uppercase",

              fontSize:
                "12px",

              letterSpacing:
                "0.1em",
            },
          }
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-[#F4F4F0] dark:bg-[#0a0a0a] p-4 md:p-8 selection:bg-[#FF3E00] selection:text-[#F4F4F0] transition-colors duration-300"
      style={{
        fontFamily:
          "'Outfit', sans-serif",
      }}
    >
      <motion.div
        initial={{
          opacity: 0,

          y: 20,

          filter:
            "blur(4px)",
        }}
        animate={{
          opacity: 1,

          y: 0,

          filter:
            "blur(0px)",
        }}
        transition={{
          duration: 0.8,

          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        }}
        className="w-full max-w-[540px] bg-white dark:bg-[#111111] border border-[#111111]/20 dark:border-white/20 transition-colors duration-300 relative"
      >
        <div className="border-b border-[#111111]/20 dark:border-white/20 p-8 md:p-12 transition-colors duration-300 bg-[#F4F4F0]/50 dark:bg-[#0a0a0a]/50">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#FF3E00] animate-pulse" />

              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#111111]/60 dark:text-white/60">
                Clearance
                Request
              </span>
            </div>

            <span className="text-[10px] font-bold tracking-widest uppercase text-[#111111]/40 dark:text-white/40">
              Smart CRM
            </span>
          </div>

          <h1
            className="text-5xl md:text-6xl font-bold tracking-tighter uppercase leading-[0.85] text-[#111111] dark:text-white transition-colors duration-300"
            style={{
              fontFamily:
                "'Syne', sans-serif",
            }}
          >
            System
            <br />
            Registry
          </h1>

          <p className="mt-6 text-[11px] font-medium tracking-widest uppercase text-[#111111]/50 dark:text-white/50 leading-relaxed transition-colors duration-300">
            Submit identity
            vector and
            passphrase to
            establish secure
            access to the
            sales workflow
            interface.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="flex flex-col gap-10 p-8 md:p-12"
        >
          <div className="flex flex-col group">
            <label className="text-[10px] font-bold tracking-widest uppercase text-[#111111]/50 dark:text-white/50 mb-3 transition-colors duration-300 group-focus-within:text-[#FF3E00]">
              Identity
              Designation
              (Name)
            </label>

            <input
              type="text"
              placeholder="ENTER FULL DESIGNATION..."
              {...formRegister(
                "name"
              )}
              className="w-full border-b-2 border-[#111111]/20 dark:border-white/20 bg-transparent py-3 text-lg font-medium text-[#111111] dark:text-white outline-none placeholder:text-[#111111]/30 dark:placeholder:text-white/30 hover:border-[#111111]/50 dark:hover:border-white/50 focus:border-[#FF3E00] transition-colors duration-300"
            />

            {errors.name && (
              <p className="mt-3 text-[10px] font-bold tracking-widest text-[#FF3E00] uppercase">
                {
                  errors.name
                    .message
                }
              </p>
            )}
          </div>

          <div className="flex flex-col group">
            <label className="text-[10px] font-bold tracking-widest uppercase text-[#111111]/50 dark:text-white/50 mb-3 transition-colors duration-300 group-focus-within:text-[#FF3E00]">
              Identity
              Vector
              (Email)
            </label>

            <input
              type="email"
              placeholder="ENTER EMAIL ADDRESS..."
              {...formRegister(
                "email"
              )}
              className="w-full border-b-2 border-[#111111]/20 dark:border-white/20 bg-transparent py-3 text-lg font-medium text-[#111111] dark:text-white outline-none placeholder:text-[#111111]/30 dark:placeholder:text-white/30 hover:border-[#111111]/50 dark:hover:border-white/50 focus:border-[#FF3E00] transition-colors duration-300"
            />

            {errors.email && (
              <p className="mt-3 text-[10px] font-bold tracking-widest text-[#FF3E00] uppercase">
                {
                  errors.email
                    .message
                }
              </p>
            )}
          </div>

          <div className="flex flex-col group">
            <label className="text-[10px] font-bold tracking-widest uppercase text-[#111111]/50 dark:text-white/50 mb-3 transition-colors duration-300 group-focus-within:text-[#FF3E00]">
              Security Key
              (Password)
            </label>

            <input
              type="password"
              placeholder="CREATE PASSPHRASE..."
              {...formRegister(
                "password"
              )}
              className="w-full border-b-2 border-[#111111]/20 dark:border-white/20 bg-transparent py-3 text-lg font-medium text-[#111111] dark:text-white outline-none placeholder:text-[#111111]/30 dark:placeholder:text-white/30 hover:border-[#111111]/50 dark:hover:border-white/50 focus:border-[#FF3E00] transition-colors duration-300"
            />

            {errors.password && (
              <p className="mt-3 text-[10px] font-bold tracking-widest text-[#FF3E00] uppercase">
                {
                  errors.password
                    .message
                }
              </p>
            )}
          </div>

          <div className="flex flex-col group">
            <label className="text-[10px] font-bold tracking-widest uppercase text-[#111111]/50 dark:text-white/50 mb-3 transition-colors duration-300 group-focus-within:text-[#FF3E00]">
              Clearance Tier
            </label>

            <select
              {...formRegister(
                "role"
              )}
              className="w-full border-b-2 border-[#111111]/20 dark:border-white/20 bg-transparent py-3 text-lg font-medium text-[#111111] dark:text-white outline-none hover:border-[#111111]/50 dark:hover:border-white/50 focus:border-[#FF3E00] transition-colors duration-300"
            >
              <option value="sales" className="bg-white dark:bg-[#111111]">
                Sales User
              </option>

              <option value="admin" className="bg-white dark:bg-[#111111]">
                Admin
              </option>
            </select>

            {errors.role && (
              <p className="mt-3 text-[10px] font-bold tracking-widest text-[#FF3E00] uppercase">
                {
                  errors.role
                    .message
                }
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              isLoading
            }
            className="mt-4 flex h-16 w-full items-center justify-center bg-[#111111] dark:bg-[#F4F4F0] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 group"
          >
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#F4F4F0] dark:text-[#111111] transition-colors duration-300 group-hover:text-[#FF3E00] dark:group-hover:text-[#FF3E00]">
              {isLoading
                ? "Processing..."
                : "Request Clearance"}
            </span>
          </button>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left border-t border-[#111111]/10 dark:border-white/10 pt-8 transition-colors duration-300">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#111111]/50 dark:text-white/50 transition-colors duration-300">
              Already
              authorized?
            </span>

            <Link
              to="/login"
              className="group flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[#111111] dark:text-white hover:text-[#FF3E00] dark:hover:text-[#FF3E00] transition-colors duration-300"
            >
              Initialize
              Session

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </form>
      </motion.div>

      <div className="mt-12 text-[10px] font-bold tracking-widest uppercase text-[#111111]/30 dark:text-white/30 transition-colors duration-300">
        ©{" "}
        {new Date().getFullYear()}{" "}
        Editorial
        Engineering.
      </div>
    </main>
  );
}