'use client'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

import { Icons } from '@/components/common/icons'
import { cn } from '@/lib/utils'
import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export interface LoadingButtonProps extends ButtonProps {
  loading: boolean
  icon?: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
  >
}

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
ButtonComponent.displayName = 'Button'

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ className, disabled, loading, icon: Icon, children, ...props }, ref) => {
    return (
      <Button
        className={cn('py-6 flex items-center justify-center gap-2 rounded-full', className)}
        disabled={loading || disabled}
        ref={ref}
        {...props}
      >
        {loading ? (
          <Icons.spinner className='animate-spin w-4 h-4 text-slate-500 dark:text-slate-400' />
        ) : (
          Icon && <Icon className='h-4 w-4' />
        )}
        {children}
      </Button>
    )
  },
)
LoadingButton.displayName = 'Button.Loading'

export const Button = Object.assign(ButtonComponent, { Loading: LoadingButton })
