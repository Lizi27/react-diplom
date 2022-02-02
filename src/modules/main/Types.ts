export type TranslateFunction = (text: string, ...params: any) => string

export type Overridable = unknown
export type Override<T, POverridable extends Overridable>
    = Omit<T, keyof POverridable> & POverridable

export type StrictKeyof<T> = Extract<keyof T, string>
